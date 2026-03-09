import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import Stripe from 'stripe';
import { createHmac, timingSafeEqual } from 'crypto';
const Razorpay = require('razorpay');
import { Address } from '@/entities/address.entity';
import { Cart } from '@/entities/cart.entity';
import { CartItem } from '@/entities/cart-item.entity';
import { InventoryMovement } from '@/entities/inventory-movement.entity';
import { OrderItem } from '@/entities/order-item.entity';
import { Order, PaymentStatus } from '@/entities/order.entity';
import { Payment } from '@/entities/payment.entity';
import { Product } from '@/entities/product.entity';
import { User } from '@/entities/user.entity';

type CheckoutItem = { productId: string; quantity: number; price?: number; name?: string };
type Provider = 'stripe' | 'razorpay' | 'mock' | 'cod';
type ShippingAddress = NonNullable<Order['shippingAddress']>;

@Injectable()
export class PaymentsService {
  private stripe: Stripe | null;
  private razorpay: any | null;

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(InventoryMovement)
    private readonly inventoryMovementRepository: Repository<InventoryMovement>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    this.stripe = stripeKey ? new Stripe(stripeKey) : null;

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    this.razorpay =
      razorpayKeyId && razorpayKeySecret
        ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
        : null;
  }

  async createOrderCheckout(
    userId: string,
    items: CheckoutItem[],
    currency: string,
    provider: Provider,
    shippingAddress?: ShippingAddress,
    paymentMethod?: string,
  ) {
    const effectiveProvider: Provider = paymentMethod === 'cod' ? 'cod' : provider;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!items.length) {
      throw new BadRequestException('Cart is empty');
    }

    const normalizedItems = await this.normalizeItems(items);
    const totalAmount = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await this.dataSource.transaction(async (manager) => {
      const createdOrder = manager.create(Order, {
        userId,
        totalAmount,
        paymentProvider: effectiveProvider,
        paymentMethod,
        status: 'pending',
        paymentStatus: 'pending',
        shippingAddress,
        items: normalizedItems.map((item) =>
          manager.create(OrderItem, {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }),
        ),
      });

      const savedOrder = await manager.save(createdOrder);
      const payment = manager.create(Payment, {
        orderId: savedOrder.id,
        provider: effectiveProvider,
        status: 'pending',
        amount: totalAmount,
        currency: currency.toUpperCase(),
      });
      await manager.save(payment);

      if (shippingAddress) {
        await this.saveAddress(manager.getRepository(Address), userId, shippingAddress);
      }

      return savedOrder;
    });

    if (paymentMethod === 'cod') {
      await this.reserveInventory(order);
      await this.clearUserCart(order.userId);

      const payment = await this.paymentRepository.findOne({ where: { orderId: order.id } });
      if (payment) {
        payment.provider = 'cod';
        payment.status = 'pending';
        payment.providerPaymentId = undefined;
        payment.payload = { source: 'cash_on_delivery' };
        await this.paymentRepository.save(payment);
      }

      order.paymentProvider = 'cod';
      order.paymentMethod = 'cod';
      order.paymentStatus = 'pending';
      await this.orderRepository.save(order);

      return {
        orderId: order.id,
        provider: 'cod',
        successUrl: `/order-success/${order.id}`,
      };
    }

    const paymentSession = await this.createCheckout(totalAmount, currency, provider, order.id);
    await this.updatePendingPayment(order.id, paymentSession);

    if (provider === 'mock') {
      await this.confirmPayment(
        order.id,
        provider,
        paymentSession.providerPaymentId ?? `mock_${order.id}`,
        {
          source: 'mock-checkout',
        },
      );
      return {
        orderId: order.id,
        successUrl: `/order-success/${order.id}`,
        ...paymentSession,
      };
    }

    return {
      orderId: order.id,
      ...paymentSession,
    };
  }

  async confirmPayment(
    orderId: string,
    provider: Provider,
    providerPaymentId: string,
    payload?: Record<string, unknown>,
  ) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const payment = await this.paymentRepository.findOne({ where: { orderId } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (
      order.paymentStatus === 'success' &&
      payment.status === 'success' &&
      payment.providerPaymentId === providerPaymentId
    ) {
      return {
        orderId: order.id,
        successUrl: `/order-success/${order.id}`,
      };
    }

    if (order.paymentStatus !== 'success') {
      await this.reserveInventory(order);
    }

    order.paymentProvider = provider;
    order.paymentId = providerPaymentId;
    order.paymentStatus = 'success';
    payment.provider = provider;
    payment.providerPaymentId = providerPaymentId;
    payment.status = 'success';
    payment.payload = payload;
    payment.confirmedAt = new Date();

    await this.paymentRepository.save(payment);
    await this.orderRepository.save(order);
    await this.clearUserCart(order.userId);

    return {
      orderId: order.id,
      successUrl: `/order-success/${order.id}`,
    };
  }

  async failPayment(orderId: string, provider: Provider, payload?: Record<string, unknown>) {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    const payment = await this.paymentRepository.findOne({ where: { orderId } });

    if (!order || !payment) {
      throw new NotFoundException('Order not found');
    }

    order.paymentStatus = 'failed';
    order.paymentProvider = provider;
    payment.status = 'failed';
    payment.payload = payload;

    await this.paymentRepository.save(payment);
    await this.orderRepository.save(order);
    return { message: 'Payment marked as failed' };
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string | undefined) {
    if (!this.stripe) {
      throw new InternalServerErrorException('Stripe is not configured');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new InternalServerErrorException('STRIPE_WEBHOOK_SECRET is not configured');
    }

    if (!signature) {
      throw new UnauthorizedException('Missing Stripe signature');
    }

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch {
      throw new UnauthorizedException('Invalid Stripe signature');
    }

    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId || !session.id) {
        throw new BadRequestException('Stripe session is missing order metadata');
      }

      return this.confirmPayment(orderId, 'stripe', session.id, {
        eventId: event.id,
        type: event.type,
      });
    }

    if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) {
        throw new BadRequestException('Stripe session is missing order metadata');
      }

      return this.failPayment(orderId, 'stripe', {
        eventId: event.id,
        type: event.type,
      });
    }

    return { received: true, ignored: true, type: event.type };
  }

  async handleRazorpayWebhook(rawBody: Buffer, signature: string | undefined) {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new InternalServerErrorException('RAZORPAY_WEBHOOK_SECRET is not configured');
    }

    if (!signature) {
      throw new UnauthorizedException('Missing Razorpay signature');
    }

    const expectedSignature = createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
    const actual = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);

    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
      throw new UnauthorizedException('Invalid Razorpay signature');
    }

    const event = JSON.parse(rawBody.toString('utf8')) as {
      event?: string;
      payload?: {
        payment?: { entity?: { id?: string; order_id?: string; notes?: { orderId?: string } } };
        order?: { entity?: { id?: string; receipt?: string; notes?: { orderId?: string } } };
      };
    };

    const orderId =
      event.payload?.order?.entity?.notes?.orderId ||
      event.payload?.payment?.entity?.notes?.orderId ||
      event.payload?.order?.entity?.receipt;
    const providerPaymentId =
      event.payload?.payment?.entity?.id || event.payload?.order?.entity?.id;

    if (!orderId || !providerPaymentId) {
      throw new BadRequestException('Razorpay webhook is missing order identifiers');
    }

    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      return this.confirmPayment(orderId, 'razorpay', providerPaymentId, { event: event.event });
    }

    if (event.event === 'payment.failed') {
      return this.failPayment(orderId, 'razorpay', { event: event.event });
    }

    return { received: true, ignored: true, type: event.event };
  }

  private async normalizeItems(items: CheckoutItem[]) {
    const normalized: Array<{ productId: string; quantity: number; price: number }> = [];

    for (const item of items) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product not found: ${item.productId}`);
      }

      if (item.quantity < 1 || item.quantity > product.stock) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }

      normalized.push({
        productId: product.id,
        quantity: item.quantity,
        price: Number(product.price),
      });
    }

    return normalized;
  }

  private async createCheckout(
    amount: number,
    currency: string,
    provider: Provider,
    orderId: string,
  ) {
    try {
      if (provider === 'mock') {
        return {
          provider: 'mock',
          providerPaymentId: `mock_${Date.now()}`,
          amount,
          currency: currency.toUpperCase(),
        };
      }

      if (provider === 'stripe') {
        if (!this.stripe) {
          throw new InternalServerErrorException('Stripe is not configured');
        }

        const successBase = process.env.FRONTEND_URL || 'http://localhost:3000';
        const session = await this.stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency,
                product_data: { name: `Order ${orderId}` },
                unit_amount: Math.round(amount * 100),
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          metadata: { orderId },
          success_url: `${successBase}/payment/success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${successBase}/payment/cancel?orderId=${orderId}`,
        });

        return { provider: 'stripe', providerPaymentId: session.id, url: session.url };
      }

      if (provider === 'razorpay') {
        if (!this.razorpay) {
          throw new InternalServerErrorException('Razorpay is not configured');
        }

        const order = await this.razorpay.orders.create({
          amount: Math.round(amount * 100),
          currency: currency.toUpperCase(),
          receipt: orderId,
          notes: { orderId },
        });

        return {
          provider: 'razorpay',
          providerOrderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key: process.env.RAZORPAY_KEY_ID,
        };
      }

      throw new InternalServerErrorException('Unsupported provider');
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  private async updatePendingPayment(orderId: string, paymentSession: Record<string, unknown>) {
    const payment = await this.paymentRepository.findOne({ where: { orderId } });
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!payment || !order) {
      return;
    }

    const providerPaymentId =
      (paymentSession.providerPaymentId as string | undefined) ||
      (paymentSession.providerOrderId as string | undefined);

    if (providerPaymentId) {
      payment.providerPaymentId = providerPaymentId;
      order.paymentId = providerPaymentId;
      await this.paymentRepository.save(payment);
      await this.orderRepository.save(order);
    }
  }

  private async reserveInventory(order: Order) {
    const items = await this.orderItemRepository.find({ where: { orderId: order.id } });

    for (const item of items) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product not found: ${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }

      product.stock -= item.quantity;
      await this.productRepository.save(product);
      await this.inventoryMovementRepository.save(
        this.inventoryMovementRepository.create({
          productId: product.id,
          delta: -item.quantity,
          reason: 'order_paid',
          orderId: order.id,
        }),
      );
    }
  }

  private async saveAddress(repo: Repository<Address>, userId: string, shippingAddress: ShippingAddress) {
    const existing = await repo.findOne({
      where: {
        userId,
        address: shippingAddress.address,
        pincode: shippingAddress.pincode,
        phone: shippingAddress.phone,
      },
    });

    if (existing) {
      return existing;
    }

    return repo.save(
      repo.create({
        userId,
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
      }),
    );
  }

  private async clearUserCart(userId: string) {
    const cart = await this.cartRepository.findOne({ where: { userId } });
    if (!cart) {
      return;
    }
    await this.cartItemRepository.delete({ cartId: cart.id });
  }
}
