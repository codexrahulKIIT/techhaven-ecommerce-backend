# TechHaven Store Backend

NestJS backend for the TechHaven Store with automatic port detection and API testing.

## Features

- **Automatic Port Detection**: Server automatically finds available ports if the configured port is busy
- **Cross-platform Compatibility**: Works on Windows, macOS, and Linux
- **API Testing**: Built-in scripts for testing API endpoints
- **PostgreSQL Database**: TypeORM integration with PostgreSQL
- **Authentication**: JWT-based authentication
- **Payments**: Integration with Stripe and Razorpay
- **File Upload**: Support for product images and other media

## Quick Start

### Starting the Server

Use the automatic port detection script:

```bash
npm run start:auto
```

This will:
- Start the NestJS server
- Automatically find an available port (starting from 3002)
- Save the port number to `server-port.txt`
- Display the API URL and testing commands

### Manual Start

```bash
npm run start:dev
```

### Testing APIs

After starting the server with `npm run start:auto`, test the APIs:

```bash
npm run test:api
```

This will test:
- User registration (`/auth/register`)
- User login (`/auth/login`)
- Products endpoint (`/products`)
- Categories endpoint (`/categories`)

### Manual API Testing

Once the server is running, you can use curl commands. The port is saved to `server-port.txt`:

```bash
# Register a user
curl -X POST http://localhost:$(cat ../server-port.txt)/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"1234567890"}'

# Login
curl -X POST http://localhost:$(cat ../server-port.txt)/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get products
curl http://localhost:$(cat ../server-port.txt)/api/products
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=techhaven_store

# JWT
JWT_SECRET=your_jwt_secret

# Payments
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Server
PORT=3002
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Payments
- `POST /api/payments/checkout` - Initiate payment checkout

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order

## Port Conflict Resolution

The server automatically handles port conflicts:

1. Attempts to use the configured port (default: 3002)
2. If busy, tries the next available port (3003, 3004, etc.)
3. Logs the actual port being used
4. Saves the port to `server-port.txt` for easy reference

## Development

```bash
# Install dependencies
npm install

# Start development server with auto port detection
npm run start:auto

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Port Issues
- The server automatically finds available ports
- Check `server-port.txt` for the actual running port
- Use `npm run start:auto` for automatic port management

### Database Connection
- Ensure PostgreSQL is running
- Check environment variables in `.env`
- Run database migrations if needed

### API Testing
- Always start the server with `npm run start:auto` first
- Use `npm run test:api` for automated testing
- Check the console output for the API URL

## License

MIT
