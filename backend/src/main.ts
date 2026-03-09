import './bootstrap-env';
import * as express from 'express';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { mkdir } from 'fs/promises';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/api/payments/webhook/stripe', express.raw({ type: 'application/json' }));
  app.use('/api/payments/webhook/razorpay', express.raw({ type: 'application/json' }));

  app.setGlobalPrefix('api', { exclude: [{ method: RequestMethod.ALL, path: '' }] });

  app.enableCors({
    origin: process.env.FRONTEND_URL || '',
    credentials: true,
  });

  const preferredPort = parseInt(process.env.PORT || '3001', 10);
  const port = await listenWithFallback(app, preferredPort);

  await updateFrontendBackendPortFile(port);
  console.log(`Backend running on port ${port}`);
}

async function listenWithFallback(app: Awaited<ReturnType<typeof NestFactory.create>>, preferredPort: number) {
  let port = preferredPort;

  while (true) {
    try {
      await app.listen(port);
      return port;
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== 'EADDRINUSE') {
        throw error;
      }

      console.warn(`Port ${port} is already in use. Trying ${port + 1}...`);
      port += 1;
    }
  }
}

async function updateFrontendBackendPortFile(port: number) {
  if (process.env.DISABLE_BACKEND_PORT_FILE === 'true') {
    return;
  }

  const backendPortPath = resolve(__dirname, '../../frontend/public/backend-port.json');
  try {
    await mkdir(dirname(backendPortPath), { recursive: true });
    await writeFile(backendPortPath, JSON.stringify({ port }, null, 2));
  } catch (error) {
    console.warn(`Skipping backend port file update at ${backendPortPath}.`, error);
  }
}

bootstrap();
