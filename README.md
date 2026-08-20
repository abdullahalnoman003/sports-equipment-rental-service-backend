<p align="center">
  <h1 align="center">⚙️ GearUp — Backend API</h1>
  <p align="center">
    A full-featured REST API for a sports & outdoor equipment rental marketplace.<br/>
    Browse gear, rent equipment, manage inventory, and process payments — all in one platform.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#1-clone-the-repository)
  - [Environment Variables](#3-configure-environment-variables)
  - [Database Setup](#4-set-up-the-database)
  - [Seed Data (Optional)](#5-seed-the-database-optional)
  - [Run the Server](#6-start-the-development-server)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Authentication](#-authentication)
- [Error Response Format](#-error-response-format)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔭 Overview

**GearUp** is a multi-role rental marketplace backend that connects **customers** looking to rent sports and outdoor equipment with **providers** who own the gear. An **admin** dashboard layer provides platform-wide oversight.

The API handles the complete rental lifecycle:

```
Browse Gear → Place Rental → Pay via Stripe → Provider Confirms → Customer Picks Up → Return → Review
```

---

## ✨ Features

| Area | Highlights |
|---|---|
| **🔐 Authentication** | JWT-based auth with httpOnly cookie tokens, role-based access control (Customer / Provider / Admin) |
| **🏕️ Gear Catalog** | Browse, search, and filter gear by category, price, and brand |
| **📦 Rental Management** | Full rental lifecycle — place, confirm, pick up, return, cancel |
| **💳 Stripe Payments** | Secure checkout sessions with webhook-based payment confirmation |
| **⭐ Reviews** | Customers can rate and review gear after returning it |
| **👤 Profiles** | Update profile info (picture, address, phone) for any authenticated user |
| **🏪 Provider Dashboard** | Providers manage their own gear inventory and incoming rental orders |
| **🛡️ Admin Panel** | Admins view all users, gear, and rentals; suspend/activate user accounts |
| **🌱 Database Seeding** | Idempotent seed script with ~100 real gear items and categories |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js 5 |
| **Language** | TypeScript 6 (ESM, strict mode) |
| **ORM** | Prisma 7 with `@prisma/adapter-pg` |
| **Database** | PostgreSQL |
| **Authentication** | JSON Web Tokens (JWT) with httpOnly cookies |
| **Payments** | Stripe Checkout |
| **Build Tool** | tsup (ESM bundle) |
| **Dev Runner** | tsx (watch mode) |
| **Hosting** | Vercel (serverless) |

---

## 📁 Project Structure

```
.
├── prisma/
│   ├── migrations/             # Database migration history
│   └── schema/                 # Multi-file Prisma schema
│       ├── schema.prisma       # Generator & datasource config
│       ├── user.prisma          # User, Role, Status models
│       ├── gear.prisma          # Gear listings model
│       ├── catagory.prisma      # Category model
│       ├── rental.prisma        # Rental orders & RentalStatus enum
│       ├── payment.prisma       # Payment records
│       ├── review.prisma        # Gear reviews
│       └── profile.prisma       # User profiles
├── scripts/
│   ├── seed.ts                 # Database seed script
│   ├── data.ts                 # Seed catalog data
│   └── gear-images.json        # 100 real image URLs for seeded gear
├── src/
│   ├── server.ts               # Entry point — connects DB & starts server
│   ├── app.ts                  # Express app configuration & route mounting
│   ├── config/
│   │   └── index.ts            # Centralized env config (source of truth)
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client instance
│   │   └── stripe.ts           # Stripe client instance
│   ├── middleware/
│   │   └── auth.middleware.ts  # JWT verification & role-based guard
│   ├── global/
│   │   ├── AppError.ts         # Custom error class
│   │   └── globalErrorhandler.ts  # Centralized error handler
│   └── modules/
│       ├── auth/               # Register, login, get current user
│       ├── gear/               # Public gear browsing & filtering
│       ├── category/           # CRUD categories (admin-write, public-read)
│       ├── provider/           # Provider gear & order management
│       ├── admin/              # Admin user, gear & rental oversight
│       ├── rental/             # Create & view rental orders
│       ├── payment/            # Stripe checkout & webhook
│       ├── review/             # Post-rental reviews
│       └── profile/            # Update user profile
├── generated/                  # (gitignored) Prisma generated client
├── dist/                       # (gitignored) Production build output
├── API Documentation/          # Detailed endpoint docs per module
├── .env.example                # Environment variable template
├── package.json
├── tsconfig.json
├── tsup.config.ts              # Build configuration
├── prisma.config.ts            # Prisma config (schema path, seed command)
└── vercel.json                 # Vercel deployment routing
```

Each module in `src/modules/` follows a consistent pattern:
- **`route.ts`** — Route definitions
- **`controller.ts`** — Request handling & response formatting
- **`service.ts`** — Business logic & database operations
- **`interface.ts`** — TypeScript types & interfaces

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18.0 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | Comes with Node.js | — |
| **PostgreSQL** | v14 or higher | [postgresql.org](https://www.postgresql.org/download/) |
| **Stripe Account** | Free tier | [stripe.com](https://stripe.com/) |

> **💡 Tip:** You can also use a hosted PostgreSQL service like [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/) instead of a local database.

---

### 1. Clone the repository

```bash
git clone https://github.com/abdullahalnoman003/sports-equipment-rental-service-backend.git
cd sports-equipment-rental-service-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your actual values:

```bash
cp .env.example .env
```

Open `.env` and update each variable:

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/gearup?schema=public` |
| `PORT` | Server port number | `5000` |
| `APP_URL` | Backend server URL (used for CORS) | `http://localhost:5000` |
| `FRONTEND_URL` | Frontend app URL (used for CORS) | `http://localhost:3000` |
| `CLIENT_URL` | Stripe success redirect URL | `http://localhost:3000` |
| `CANCEL_URL` | Stripe cancel redirect URL | `http://localhost:3000` |
| `BCRYPT_SALT_ROUNDS` | Password hashing strength | `10` |
| `JWT_ACCESS_SECRET` | Secret key for access tokens | *(any secure random string)* |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | *(any secure random string)* |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry duration | `1d` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry duration | `7d` |
| `STRIPE_SECRET_KEY` | Your Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook signing secret | `whsec_...` |
| `STRIPE_PRODUCT_PRICE_ID` | *(Currently unused — set any value)* | `price_...` |

> **⚠️ Important:** The `FRONTEND_URL` variable is **required** for CORS but is missing from the older `.env.example`. Make sure to add it manually.

### 4. Set up the database

Generate the Prisma client and sync the schema to your database:

```bash
# Generate the Prisma client (REQUIRED after clone & after schema changes)
npx prisma generate

# Push the schema to your database (creates tables)
npx prisma db push
```

> **📝 Note:** The `generated/prisma/` directory is gitignored. You **must** run `npx prisma generate` after every fresh clone or schema change — the app won't start without it.

### 5. Seed the database (optional)

Populate your database with sample categories and ~100 real gear items:

```bash
npx prisma db seed
```

The seed script is idempotent — re-running it updates existing records instead of creating duplicates.

### 6. Start the development server

```bash
npm run dev
```

The server starts with `tsx watch` and automatically restarts on file changes.

```
✅ Connected to the database successfully.
✅ Server is running on port 5000
```

Visit **http://localhost:5000** to verify — you should see `"Hello From GearUp!"`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload (`tsx watch`) |
| `npm run build` | Build production bundle to `dist/` (`tsup`) |
| `npm start` | Run production build (`node dist/server.js`) |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma migrate dev` | Create a new migration |
| `npx prisma db seed` | Seed database with sample data |
| `npx prisma studio` | Open Prisma Studio (visual DB editor) |
| `npx tsc --noEmit` | Type-check the project (no output) |

---

## 📡 API Reference

**Base URL:** `http://localhost:5000`

All responses follow this standard format:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Description of the result",
  "data": { ... }
}
```

### Routes Overview

#### 🔐 Authentication — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ Public | Register a new Customer or Provider |
| `POST` | `/api/auth/login` | ❌ Public | Login and receive JWT tokens |
| `GET` | `/api/auth/me` | ✅ Any Role | Get current user's profile |

#### 🏕️ Gear — `/api/gear`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/gear/gear` | ❌ Public | List all gear (supports filtering) |
| `GET` | `/api/gear/:id` | ❌ Public | Get gear details by ID |

#### 📂 Categories — `/api/category`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/category` | ❌ Public | List all categories |
| `POST` | `/api/category/create-category` | 🛡️ Admin | Create a category |
| `PUT` | `/api/category/update-category/:id` | 🛡️ Admin | Update a category |
| `DELETE` | `/api/category/delete-category/:id` | 🛡️ Admin | Delete a category |

#### 📦 Rentals — `/api/rental`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/rental/create-rental` | 👤 Customer | Create a rental order |
| `GET` | `/api/rental/get-rentals` | 👤 Customer | List your rental orders |
| `GET` | `/api/rental/get-rentals/:id` | 👤 Customer | Get rental order details |

#### 💳 Payments — `/api/payment`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/payment/create` | 👤 Customer | Create Stripe checkout session |
| `POST` | `/api/payment/confirm` | 🔒 Webhook | Stripe webhook for payment confirmation |
| `GET` | `/api/payment/` | 👤 Customer | List payment history |
| `GET` | `/api/payment/:id` | 👤 Customer | Get payment details |

#### 🏪 Provider — `/api/provider`

> All endpoints require **Provider** authentication.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/provider/gear` | Add new gear to inventory |
| `GET` | `/api/provider/gear/getallgear` | List provider's own gear |
| `PUT` | `/api/provider/gear/:id` | Update gear details |
| `DELETE` | `/api/provider/gear/:id` | Remove gear from inventory |
| `GET` | `/api/provider/orders/` | View incoming rental orders |
| `PATCH` | `/api/provider/orders/:id` | Update rental order status |

#### ⭐ Reviews — `/api/review`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/review` | 👤 Customer | Submit a review for rented gear |

#### 👤 Profile — `/api/profile`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `PUT` | `/api/profile/update-profile` | ✅ Any Role | Update your profile info |

#### 🛡️ Admin — `/api/admin`

> All endpoints require **Admin** authentication.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/users` | List all users |
| `PATCH` | `/api/admin/users/:id` | Update user status (suspend/activate) |
| `GET` | `/api/admin/gear` | List all gear platform-wide |
| `GET` | `/api/admin/rentals` | List all rental orders platform-wide |

> **📖 Detailed request/response examples** for each endpoint are available in the [`API Documentation/`](./API%20Documentation/) directory.

---

## 🔐 Authentication

GearUp uses **JWT (JSON Web Token)** authentication stored in httpOnly cookies.

### How it works:

1. **Register** or **Login** via `/api/auth/register` or `/api/auth/login`
2. On success, the server sets two httpOnly cookies:
   - `accessToken` — Short-lived token used for API authorization
   - `refreshToken` — Longer-lived token (refresh endpoint not yet implemented)
3. All subsequent requests automatically include the cookies
4. Protected routes verify the `accessToken` cookie and check the user's role

### Roles:

| Role | Access Level |
|---|---|
| `CUSTOMER` | Browse gear, place rentals, make payments, write reviews |
| `PROVIDER` | Manage own gear inventory, handle incoming rental orders |
| `ADMIN` | Full platform oversight — users, gear, rentals, categories |

---

## ❌ Error Response Format

All errors follow the same consistent structure:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "User not found",
  "data": {}
}
```

| Status Code | Meaning |
|---|---|
| `400` | Bad Request — Validation error or missing fields |
| `401` | Unauthorized — Missing or invalid token |
| `403` | Forbidden — Insufficient role permissions |
| `404` | Not Found — Resource doesn't exist |
| `409` | Conflict — Duplicate resource (e.g., email already exists) |
| `500` | Internal Server Error |

---

## 🌐 Deployment

### Deploy to Vercel

The project is pre-configured for Vercel serverless deployment.

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   ```bash
   npx vercel --prod
   ```

3. **Set environment variables** in the Vercel dashboard under *Settings → Environment Variables*.

> **📝 Note:** The `main()` function in `server.ts` is gated behind `!process.env.VERCEL`, so the app auto-exports for serverless when deployed to Vercel.

### Deploy elsewhere

For any other platform (Railway, Render, DigitalOcean, etc.):

```bash
npm run build
npm start
```

Make sure all environment variables are set and the `DATABASE_URL` points to an accessible PostgreSQL instance.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/abdullahalnoman003">Abdullah Al Noman</a>
</p>