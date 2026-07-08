# GearUp Backend

This repository contains the backend code for GearUp, a sports and outdoor equipment rental service. The API provides endpoints for customers to browse and rent gear, providers to manage their inventory, and administrators to oversee the platform.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

## Tech Stack
- **Framework:** Express.js (Node.js)
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Database:** PostgreSQL (or MongoDB based on setup)
- **Authentication:** JWT (JSON Web Tokens)
- **Payment Gateway:** Stripe

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn or pnpm
- PostgreSQL database (or other supported by Prisma setup)

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Assignment 4"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in your actual credentials.
   ```bash
   cp .env.example .env
   ```

4. **Initialize the database:**
   Generate the Prisma client and push the schema to your database.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

See `.env.example` for a complete list of required environment variables.

## API Documentation

### Authentication (`/api/auth`)
- **`POST /api/auth/register`**: Register a new user (Customer or Provider).
- **`POST /api/auth/login`**: Authenticate a user and return a JWT access token.
- **`GET /api/auth/me`**: Fetch the currently authenticated user's profile information. (Requires Auth)

### Gear (`/api/gear`)
- **`GET /api/gear`**: Fetch all available gear. Supports filtering by category, price, and brand.
- **`GET /api/gear/:id`**: Fetch detailed information about a specific gear item.

### Categories (`/api/category`)
- **`GET /api/category`**: Fetch all gear categories available on the platform.
- **`POST /api/category/create-category`**: Create a new gear category. (Requires Admin Auth)
- **`DELETE /api/category/delete-category/:id`**: Delete an existing gear category. (Requires Admin Auth)
- **`PUT /api/category/update-category/:id`**: Update details of a specific gear category when no gears exist in it. (Requires Admin Auth)

### Profile (`/api/profile`)
- **`PUT /api/profile/update-profile`**: Update the authenticated user's profile information. (Requires Auth)

### Rental Orders (`/api/rental`)
- **`POST /api/rental/create-rental`**: Create a new rental order for selected gear. (Requires Customer Auth)
- **`GET /api/rental/get-rentals`**: Fetch all rental orders placed by the authenticated customer. (Requires Customer Auth)
- **`GET /api/rental/get-rentals/:id`**: Fetch detailed information about a specific rental order. (Requires Customer Auth)

### Payments (`/api/payment`)
- **`POST /api/payment/create`**: Create a Stripe payment intent for a rental order. (Requires Customer Auth)
- **`POST /api/payment/confirm`**: Stripe webhook to confirm payment success.
- **`GET /api/payment/`**: Fetch the payment history of the authenticated customer. (Requires Customer Auth)
- **`GET /api/payment/:id`**: Fetch detailed information about a specific payment. (Requires Customer Auth)

### Provider Management (`/api/provider`)
*(All provider endpoints require Provider Auth)*
- **`POST /api/provider/gear`**: Add a new gear item to the provider's inventory.
- **`GET /api/provider/gear/getallgear`**: Fetch all gear items owned by the authenticated provider.
- **`PUT /api/provider/gear/:id`**: Update details of a specific gear item in the inventory.
- **`DELETE /api/provider/gear/:id`**: Remove a gear item from the provider's inventory.
- **`GET /api/provider/orders/`**: View all incoming rental orders for the provider's gear.
- **`PATCH /api/provider/orders/:id`**: Update the status of a rental order (e.g., CONFIRMED, PICKED_UP, RETURNED).

### Reviews (`/api/review`)
- **`POST /api/review`**: Submit a review and rating for a rented gear item after returning it. (Requires Customer Auth)

### Admin Management (`/api/admin`)
*(All admin endpoints require Admin Auth)*
- **`GET /api/admin/users`**: Fetch a list of all registered users (customers and providers).
- **`PATCH /api/admin/users/:id`**: Update the status of a user (e.g., suspend or activate).
- **`GET /api/admin/gear`**: Fetch all gear listings across the platform.
- **`GET /api/admin/rentals`**: Fetch all rental orders across the platform.