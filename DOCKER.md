# Docker Setup

## Services

- `frontend`: Next.js app on `http://localhost:3004` by default
- `backend`: NestJS API on `http://localhost:3002/api` by default
- `db`: PostgreSQL on `localhost:5433` by default

The stack also includes a one-time `backend-init` job that bootstraps the schema from `database/schema.sql` and seeds baseline data before the API starts.

## Start

```powershell
docker compose up --build
```

## Stop

```powershell
docker compose down
```

To stop and remove the PostgreSQL volume too:

```powershell
docker compose down -v
```

## Rebuild Cleanly

```powershell
docker compose down -v
docker compose up --build
```

## Seeded Accounts

- Admin: `admin@techhaven.com` / `adminpassword`
- User: `user@techhaven.com` / `userpassword`
- Test user: `test3@example.com` / `password`

## Notes

- Browser-to-API traffic uses `http://localhost:3002/api` by default.
- Container-to-container Next.js rewrites use `http://backend:3001`.
- Backend port file writing is disabled in Docker because the frontend is not mounted into the backend container.
- Provide payment secrets through shell environment variables before `docker compose up` if you want live Stripe or Razorpay behavior.
- If `3004`, `3002`, or `5433` is busy on your machine too, set custom host ports before startup:

```powershell
$env:FRONTEND_HOST_PORT="3000"
$env:BACKEND_HOST_PORT="3005"
$env:DB_HOST_PORT="55432"
docker compose up --build
```
