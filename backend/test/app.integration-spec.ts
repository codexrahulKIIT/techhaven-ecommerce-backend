import './bootstrap-env';
import * as express from 'express';
import { INestApplication, RequestMethod } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { createHmac } from 'crypto';
import Stripe from 'stripe';
import { AppModule } from '../src/app.module';
import { prepareTestDatabase } from './helpers/prepare-test-database';

describe('Backend integration', () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_codex';
    process.env.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_codex_test';
    process.env.RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'rzp_whsec_test';

    await prepareTestDatabase();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use('/api/payments/webhook/stripe', express.raw({ type: 'application/json' }));
    app.use('/api/payments/webhook/razorpay', express.raw({ type: 'application/json' }));
    app.setGlobalPrefix('api', { exclude: [{ method: RequestMethod.ALL, path: '' }] });
    await app.init();

    adminToken = await loginAdmin(app);
    userToken = await loginUser(app);
  }, 120000);

  afterAll(async () => {
    await app?.close();
  });

  it('returns seeded catalog data', async () => {
    const [productsResponse, categoriesResponse] = await Promise.all([
      request(app.getHttpServer()).get('/api/products').expect(200),
      request(app.getHttpServer()).get('/api/categories').expect(200),
    ]);

    expect(Array.isArray(productsResponse.body.products)).toBe(true);
    expect(productsResponse.body.products.length).toBeGreaterThan(0);
    expect(Array.isArray(categoriesResponse.body)).toBe(true);
    expect(categoriesResponse.body.length).toBeGreaterThan(0);
  });

  it('registers a new user and rejects duplicate registration', async () => {
    const email = `integration-${Date.now()}@example.com`;
    const payload = {
      firstName: 'Integration',
      lastName: 'User',
      email,
      phone: `9${Date.now().toString().slice(-9)}`,
      password: 'Password123!',
    };

    const registerResponse = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(payload)
      .expect(201);

    expect(registerResponse.body.accessToken).toBeTruthy();
    expect(registerResponse.body.user.email).toBe(email);

    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(payload)
      .expect(409);
  });

  it('rotates refresh tokens and revokes them on logout', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'user@techhaven.com', password: 'userpassword' })
      .expect(201);

    expect(loginResponse.body.refreshToken).toBeTruthy();

    const refreshResponse = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: loginResponse.body.refreshToken })
      .expect(201);

    expect(refreshResponse.body.accessToken).toBeTruthy();
    expect(refreshResponse.body.refreshToken).toBeTruthy();
    expect(refreshResponse.body.refreshToken).not.toBe(loginResponse.body.refreshToken);

    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .send({ refreshToken: refreshResponse.body.refreshToken })
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: refreshResponse.body.refreshToken })
      .expect(401);
  });

  it('supports address CRUD for authenticated users', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/api/addresses')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        label: 'Home',
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@techhaven.com',
        phone: '9876543210',
        address: '12 MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        isDefault: true,
      })
      .expect(201);

    const addressId = createResponse.body.id as string;
    expect(addressId).toBeTruthy();

    const listResponse = await request(app.getHttpServer())
      .get('/api/addresses')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(Array.isArray(listResponse.body)).toBe(true);
    expect(listResponse.body.some((address: { id: string }) => address.id === addressId)).toBe(true);

    await request(app.getHttpServer())
      .put(`/api/addresses/${addressId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        city: 'Mysuru',
        state: 'Karnataka',
      })
      .expect(200);

    const updatedListResponse = await request(app.getHttpServer())
      .get('/api/addresses')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    const updatedAddress = updatedListResponse.body.find((address: { id: string }) => address.id === addressId);
    expect(updatedAddress.city).toBe('Mysuru');

    await request(app.getHttpServer())
      .delete(`/api/addresses/${addressId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });

  it('protects checkout for guests and allows mock checkout for authenticated users', async () => {
    await request(app.getHttpServer())
      .post('/api/payments/checkout')
      .send({
        provider: 'mock',
        cart: [{ id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', quantity: 1, price: 850, name: 'Arduino Uno' }],
      })
      .expect(401);

    const response = await request(app.getHttpServer())
      .post('/api/payments/checkout')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        provider: 'mock',
        cart: [{ id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', quantity: 1, price: 850, name: 'Arduino Uno' }],
        shippingAddress: {
          firstName: 'Regular',
          lastName: 'User',
          email: 'user@techhaven.com',
          phone: '9876543210',
          address: '123 Test Street',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
        },
        paymentMethod: 'card',
      })
      .expect(201);

    expect(response.body.orderId).toBeTruthy();
    expect(response.body.successUrl).toMatch(/\/order-success\//);
  });

  it('enforces admin RBAC on admin endpoints', async () => {
    await request(app.getHttpServer())
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);

    const response = await request(app.getHttpServer())
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users.length).toBeGreaterThan(0);
  });

  it('allows an admin to update an order status and persists the change', async () => {
    const ordersResponse = await request(app.getHttpServer())
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(ordersResponse.body)).toBe(true);
    expect(ordersResponse.body.length).toBeGreaterThan(0);

    const orderId = ordersResponse.body[0].id as string;
    expect(orderId).toBeTruthy();

    await request(app.getHttpServer())
      .put(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'shipped' })
      .expect(200);

    const updatedOrdersResponse = await request(app.getHttpServer())
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    const updatedOrder = updatedOrdersResponse.body.find((order: { id: string; status: string }) => order.id === orderId);
    expect(updatedOrder).toBeTruthy();
    expect(updatedOrder.status).toBe('shipped');
  });

  it('verifies a Stripe webhook and marks the order paid', async () => {
    const checkoutResponse = await request(app.getHttpServer())
      .post('/api/payments/checkout')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        provider: 'mock',
        cart: [{ id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', quantity: 1, price: 850, name: 'Arduino Uno' }],
        shippingAddress: {
          firstName: 'Webhook',
          lastName: 'User',
          email: 'user@techhaven.com',
          phone: '9876543210',
          address: '456 Stripe Street',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
        },
      })
      .expect(201);

    const orderId = checkoutResponse.body.orderId as string;

    const payload = JSON.stringify({
      id: 'evt_test_checkout_completed',
      object: 'event',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123',
          object: 'checkout.session',
          metadata: { orderId },
        },
      },
    });

    const signature = Stripe.webhooks.generateTestHeaderString({
      payload,
      secret: process.env.STRIPE_WEBHOOK_SECRET as string,
    });

    await request(app.getHttpServer())
      .post('/api/payments/webhook/stripe')
      .set('stripe-signature', signature)
      .set('Content-Type', 'application/json')
      .send(payload)
      .expect(201);

    const orderResponse = await request(app.getHttpServer())
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(orderResponse.body.paymentStatus).toBe('success');
    expect(orderResponse.body.paymentId).toBe('cs_test_123');
  });

  it('verifies a Razorpay webhook and marks the order paid', async () => {
    const checkoutResponse = await request(app.getHttpServer())
      .post('/api/payments/checkout')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        provider: 'mock',
        cart: [{ id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', quantity: 1, price: 850, name: 'Arduino Uno' }],
        shippingAddress: {
          firstName: 'Webhook',
          lastName: 'User',
          email: 'user@techhaven.com',
          phone: '9876543210',
          address: '123 Razorpay Street',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
        },
      })
      .expect(201);

    const orderId = checkoutResponse.body.orderId as string;
    const payload = JSON.stringify({
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_test_123',
            order_id: 'order_test_123',
            notes: { orderId },
          },
        },
        order: {
          entity: {
            id: 'order_test_123',
            receipt: orderId,
            notes: { orderId },
          },
        },
      },
    });

    const signature = createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET as string)
      .update(Buffer.from(payload))
      .digest('hex');

    await request(app.getHttpServer())
      .post('/api/payments/webhook/razorpay')
      .set('x-razorpay-signature', signature)
      .set('Content-Type', 'application/json')
      .send(payload)
      .expect(201);

    const orderResponse = await request(app.getHttpServer())
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(orderResponse.body.paymentStatus).toBe('success');
    expect(orderResponse.body.paymentId).toBe('pay_test_123');
  });
});

async function loginUser(app: INestApplication): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({ email: 'user@techhaven.com', password: 'userpassword' })
    .expect(201);

  return response.body.token;
}

async function loginAdmin(app: INestApplication): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/api/admin/login')
    .send({ email: 'admin@techhaven.com', password: 'adminpassword' })
    .expect(201);

  return response.body.token;
}
