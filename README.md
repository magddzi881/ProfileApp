# Profile (Furniture) App

A full-stack web application for managing furniture items with role-based access control, built with React, Node.js, Express, Prisma, and SQLite. Authentication and authorization are handled using Auth0 and JWT tokens.

## Overview

This application consists of:

- **Backend**: Node.js with Express, using Prisma as the ORM and SQLite as the database. Includes mock data seeded via a `seed` script.
- **Frontend**: React application that interacts with the backend API.
- **Authentication & Authorization**: Auth0 handles login and JWT tokens. The app supports role-based access:

  - **User**: Can view furniture lists and their profile.
  - **Admin**: Can view, add, and delete furniture items.

## Features

- Browse furniture items,
- Add new furniture items (admin only),
- Delete furniture items (admin only),
- View user profile,
- Log in or create a new account,
- JWT-based authentication and role integration via Auth0.

## Installation & Setup

### Backend Setup

1. Navigate to the backend folder and install dependencies:

```bash
npm install
```

2. Configure environment variables:

Create a `.env` file with the following (change the `profile-app-be/env-file-template.txt` file):

```env
AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_AUDIENCE=YOUR_AUTH0_API_IDENTIFIER
PORT=3000
```

3. Run Prisma migrations and seed the database:

```bash
npx prisma migrate dev --name init
npm run seed
```

4. Start the backend server:

```bash
npm start
```

The backend API will be available at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder and install dependencies:

```bash
npm install
```

2. Update Auth0 configuration in the `Auth0Provider` (in `profile-app/main.tsx`):

```ts
<Auth0Provider
  domain="YOUR_AUTH0_DOMAIN"
  clientId="YOUR_AUTH0_CLIENT_ID"
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: "YOUR_AUTH0_API_IDENTIFIER",
  }}
>
```

3. Start the React + Vite app:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/`.

## Usage

1. Open the frontend in a browser.
2. Log in or sign in via Auth0 using sample accounts:

**Admin**

- Email: `admin@admin.pl`
- Password: `Admin123!`

**User**

- Email: `user@user.pl`
- Password: `User123!`

3. Explore the furniture list, add new items (admin only), or delete items (admin only). View user profile or log out.

## Endpoints

| Method | Endpoint             | Role  | Description                 |
| ------ | -------------------- | ----- | --------------------------- |
| GET    | `/api/furniture`     | Any   | Get all furniture items     |
| GET    | `/api/furniture/:id` | Any   | Get furniture item by ID    |
| POST   | `/api/furniture`     | Admin | Add a new furniture item    |
| DELETE | `/api/furniture/:id` | Admin | Delete furniture item by ID |

## Tech Stack

- **Frontend**: React + Vite, TypeScript
- **Backend**: Node.js + Express, Prisma
- **Database**: SQLite
- **Authentication**: Auth0
- **Authorization**: Role-based (admin/user) with JWT
