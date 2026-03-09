<div align="center">

<img src="https://img.shields.io/badge/TechHaven-E--Commerce-6366f1?style=for-the-badge&logo=shopify&logoColor=white" alt="TechHaven" />

# 🛒 TechHaven E-Commerce Backend

**A scalable, production-ready e-commerce backend built with FastAPI, PostgreSQL, and AWS.**

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat-square&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Docker Setup](#-docker-setup) • [API Docs](#-api-documentation) • [Environment Variables](#-environment-variables) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

TechHaven is a full-stack e-commerce platform backend engineered for scalability and reliability. It provides a complete API layer covering user authentication, product catalog management, shopping cart, order lifecycle, and Razorpay payment integration — all backed by PostgreSQL and deployed with AWS cloud infrastructure.

```
techhaven-ecommerce-backend/
├── backend/          # Core API server (FastAPI / Node.js)
├── database/         # Database schemas, migrations & seeds
├── frontend/         # Frontend application (TypeScript)
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── DOCKER.md
```

---

## ✨ Features

| Module | Description |
|---|---|
| 🔐 **Authentication** | JWT-based auth with registration, login, and token refresh |
| 📦 **Product Catalog** | Full CRUD for products with categories, images, and filtering |
| 🛒 **Shopping Cart** | Add, update, remove items; persistent cart per user |
| 📋 **Order Management** | Place orders, track status, and manage order history |
| 💳 **Razorpay Payments** | Integrated payment gateway with webhook verification |
| ☁️ **AWS Integration** | S3 for media storage, scalable cloud deployment |
| 🐳 **Docker Support** | Fully containerized with Docker Compose for easy setup |
| 📚 **Auto Docs** | Swagger UI & ReDoc available out of the box |

---

## 🛠 Tech Stack

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — High-performance Python/TypeScript web framework
- [PostgreSQL](https://www.postgresql.org/) — Relational database
- [SQLAlchemy / Prisma](https://www.sqlalchemy.org/) — ORM for database interaction
- [Pydantic](https://docs.pydantic.dev/) — Data validation and settings management
- [JWT](https://jwt.io/) — Secure token-based authentication

**Infrastructure**
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) — Containerization
- [AWS S3](https://aws.amazon.com/s3/) — Object storage for product images
- [Razorpay](https://razorpay.com/) — Payment processing

**Frontend**
- [TypeScript](https://www.typescriptlang.org/) — Strongly typed client

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) `>= 18.x` or [Python](https://www.python.org/) `>= 3.10`
- [PostgreSQL](https://www.postgresql.org/download/) `>= 14`
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started) *(optional but recommended)*

---

### 1. Clone the Repository

```bash
git clone https://github.com/codexrahulKIIT/techhaven-ecommerce-backend.git
cd techhaven-ecommerce-backend
```

---

### 2. Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and set the required variables (see [Environment Variables](#-environment-variables) section below).

---

### 3. Database Setup

Create a new PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE techhaven;
\q
```

Run migrations:

```bash
# If using Python/Alembic
alembic upgrade head

# If using Node.js/Prisma
npx prisma migrate dev
```

Optionally seed demo data:

```bash
# From the database/ folder
cd database
psql -U postgres -d techhaven -f seed.sql
```

---

### 4. Install Dependencies

**Backend:**

```bash
cd backend

# Python
pip install -r requirements.txt

# OR Node.js
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

---

### 5. Run the Application

**Backend (development mode):**

```bash
cd backend

# Python / Uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# OR Node.js
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

The API will be available at `http://localhost:8000`

---

## 🐳 Docker Setup

The easiest way to run the entire stack is with Docker Compose. See [`DOCKER.md`](./DOCKER.md) for full details.

### Quick Start with Docker

```bash
# Build and start all services (backend + frontend + database)
docker-compose up --build

# Run in detached (background) mode
docker-compose up -d --build
```

### Stop Services

```bash
docker-compose down

# Remove volumes (wipe database data)
docker-compose down -v
```

### Rebuild a Single Service

```bash
docker-compose up --build backend
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Docker Services Overview

| Service | Port | Description |
|---|---|---|
| `backend` | `8000` | API server |
| `frontend` | `3000` | Frontend app |
| `db` | `5432` | PostgreSQL database |

---

## 📚 API Documentation

Once the backend is running, interactive API docs are auto-generated:

| Interface | URL |
|---|---|
| **Swagger UI** | `http://localhost:8000/docs` |
| **ReDoc** | `http://localhost:8000/redoc` |
| **OpenAPI JSON** | `http://localhost:8000/openapi.json` |

### Key Endpoints

#### 🔐 Auth
```
POST   /api/auth/register     Register a new user
POST   /api/auth/login        Login and receive JWT token
POST   /api/auth/refresh      Refresh access token
POST   /api/auth/logout       Invalidate token
```

#### 📦 Products
```
GET    /api/products          List all products (with pagination & filters)
GET    /api/products/:id      Get product details
POST   /api/products          Create a product (admin)
PUT    /api/products/:id      Update a product (admin)
DELETE /api/products/:id      Delete a product (admin)
```

#### 🛒 Cart
```
GET    /api/cart              Get current user's cart
POST   /api/cart/items        Add item to cart
PUT    /api/cart/items/:id    Update item quantity
DELETE /api/cart/items/:id    Remove item from cart
DELETE /api/cart              Clear entire cart
```

#### 📋 Orders
```
POST   /api/orders            Place a new order
GET    /api/orders            List user orders
GET    /api/orders/:id        Get order details
PUT    /api/orders/:id/status Update order status (admin)
```

#### 💳 Payments
```
POST   /api/payments/create   Create Razorpay order
POST   /api/payments/verify   Verify payment signature
POST   /api/payments/webhook  Razorpay webhook handler
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ─── Application ─────────────────────────────────────────
APP_ENV=development
APP_PORT=8000
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# ─── Database ────────────────────────────────────────────
DATABASE_URL=postgresql://postgres:password@localhost:5432/techhaven
DB_HOST=localhost
DB_PORT=5432
DB_NAME=techhaven
DB_USER=postgres
DB_PASSWORD=your_db_password

# ─── AWS ─────────────────────────────────────────────────
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET_NAME=techhaven-assets

# ─── Razorpay ────────────────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# ─── CORS ────────────────────────────────────────────────
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## ☁️ AWS Configuration

### S3 Bucket Setup

1. Create an S3 bucket in your AWS console (e.g., `techhaven-assets`)
2. Enable public read access for product images **or** use pre-signed URLs
3. Set the following bucket CORS policy to allow uploads from your frontend:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "ExposeHeaders": []
  }
]
```

4. Create an IAM user with `AmazonS3FullAccess` (or a scoped policy), and copy the access keys into your `.env`.

---

## 💳 Razorpay Integration

1. Create an account at [dashboard.razorpay.com](https://dashboard.razorpay.com/)
2. Navigate to **Settings → API Keys** and generate test keys
3. Copy `Key ID` and `Key Secret` into your `.env`
4. For webhooks:
   - Go to **Settings → Webhooks** in the Razorpay dashboard
   - Set the webhook URL to `https://yourdomain.com/api/payments/webhook`
   - Set the webhook secret and add it to `RAZORPAY_WEBHOOK_SECRET` in `.env`

---

## 🗄️ Database Schema

```
users
├── id, email, password_hash, name, role, created_at

products
├── id, name, description, price, stock, category_id, image_url, created_at

categories
├── id, name, slug

cart
├── id, user_id, created_at

cart_items
├── id, cart_id, product_id, quantity

orders
├── id, user_id, total, status, razorpay_order_id, created_at

order_items
├── id, order_id, product_id, quantity, price

payments
├── id, order_id, razorpay_payment_id, status, created_at
```

---

## 🧪 Running Tests

```bash
cd backend

# Python
pytest

# Node.js
npm test

# With coverage
npm run test:coverage
```

---

## 📁 Project Structure

```
techhaven-ecommerce-backend/
│
├── backend/                  # API server
│   ├── src/
│   │   ├── auth/             # Authentication module
│   │   ├── products/         # Product catalog module
│   │   ├── cart/             # Cart module
│   │   ├── orders/           # Orders module
│   │   ├── payments/         # Razorpay payment module
│   │   └── common/           # Shared utilities
│   ├── Dockerfile
│   └── requirements.txt / package.json
│
├── database/                 # SQL schemas, migrations, seed data
│   ├── migrations/
│   └── seed.sql
│
├── frontend/                 # Client application (TypeScript)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml        # Multi-service orchestration
├── .dockerignore
├── .gitignore
├── DOCKER.md                 # Docker-specific documentation
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: add your feature description"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request on GitHub
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 🐛 Troubleshooting

**Database connection refused**
> Make sure PostgreSQL is running and `DATABASE_URL` in `.env` is correct. If using Docker, ensure the `db` container is healthy before the backend starts.

**Port already in use**
> Change the port in `.env` or run `lsof -i :8000` (macOS/Linux) to find and kill the occupying process.

**AWS S3 upload errors**
> Verify your IAM credentials have S3 write permissions and the bucket name matches `AWS_S3_BUCKET_NAME`.

**Razorpay payment not verifying**
> Double-check that `RAZORPAY_KEY_SECRET` matches the one in your Razorpay dashboard. Make sure you're using test keys in development.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [codexrahulKIIT](https://github.com/codexrahulKIIT)

⭐ Star this repo if you found it helpful!

</div>
