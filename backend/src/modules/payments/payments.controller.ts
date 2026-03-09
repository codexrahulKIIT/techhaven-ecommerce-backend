import { BadRequestException, Body, Controller, Headers, Param, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request as ExpressRequest } from 'express';
import { PaymentsService } from './payments.service';
import { CheckoutDto, ConfirmPaymentDto } from './dto/payments.dto';

@Controller('payments')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  @UseGuards(AuthGuard('jwt'))
  async checkout(
    @Request() req: any,
    @Body() payload: CheckoutDto,
  ) {
    if (!payload.cart?.length || !payload.provider) {
      throw new BadRequestException('Missing required fields: cart and provider');
    }

    const items = payload.cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
    }));

    return this.paymentsService.createOrderCheckout(
      req.user.id,
      items,
      payload.currency || 'inr',
      payload.provider,
      payload.shippingAddress,
      payload.paymentMethod,
    );
  }

  @Post('confirm')
  @UseGuards(AuthGuard('jwt'))
  async confirm(@Body() payload: ConfirmPaymentDto) {
    if (!payload.orderId || !payload.provider || !payload.providerPaymentId) {
      throw new BadRequestException('Missing required payment confirmation fields');
    }
    return this.paymentsService.confirmPayment(
      payload.orderId,
      payload.provider,
      payload.providerPaymentId,
      payload.payload,
    );
  }

  @Post('webhook/:provider')
  async webhook(
    @Param('provider') provider: 'stripe' | 'razorpay' | 'mock',
    @Req() req: ExpressRequest & { body: Buffer | Record<string, unknown> },
    @Headers('stripe-signature') stripeSignature?: string,
    @Headers('x-razorpay-signature') razorpaySignature?: string,
  ) {
    if (provider === 'stripe') {
      if (!Buffer.isBuffer(req.body)) {
        throw new BadRequestException('Stripe webhook requires raw request body');
      }
      return this.paymentsService.handleStripeWebhook(req.body, stripeSignature);
    }

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(JSON.stringify(req.body ?? {}), 'utf8');

    if (provider === 'razorpay') {
      return this.paymentsService.handleRazorpayWebhook(rawBody, razorpaySignature);
    }

    throw new BadRequestException('Unsupported webhook provider');
  }
}
