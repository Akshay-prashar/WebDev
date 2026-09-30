# Database Package (`@repo/db`)

Centralized database layer providing the **Prisma 7 ORM** schema, PostgreSQL connection adapter, database migrations, and a typed singleton client for the entire RupeeOne Wallet monorepo.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Prisma 7 Architecture](#-prisma-7-architecture)
- [Schema & Data Models](#-schema--data-models)
- [Client Singleton Usage](#-client-singleton-usage)
- [Available Scripts & Commands](#-available-scripts--commands)
- [Environment Configuration](#-environment-configuration)

---

## 🏛 Overview

All database interactions across `apps/user-app` and `apps/bank-webhook` funnel through this package. It provides:
- A single source of truth for database schema definitions in [`prisma/schema.prisma`](prisma/schema.prisma).
- Automated type-safety through generated TypeScript types.
- Next.js development-friendly singleton client initialization that avoids "too many connections" errors during hot-reloads.

---

## ⚙️ Prisma 7 Architecture

This project leverages **Prisma ORM 7.x** featuring:
- **Rust-Free Driver Adapter**: Uses `@prisma/adapter-pg` to route database queries through Node's native `pg` pool, providing better connection control and compatibility with serverless environments.
- **Custom Client Generation**: Generates pure TypeScript client source into `generated/prisma`, compiled to JavaScript + type definitions via `tsc`.

In [`prisma/schema.prisma`](prisma/schema.prisma):
```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

---

## 🗄 Schema & Data Models

### Money Units (Paise)
> [!IMPORTANT]
> All currency amounts in the database are stored as **integers in Paise (cents)**:
> `₹100.00` = `10000` paise.

### Models Summary

#### 1. `User`
Stores registered customer accounts.
```prisma
model User {
  id                Int                 @id @default(autoincrement())
  email             String              @unique
  name              String?
  number            String              @unique 
  password          String
  balance           Balance[]
  OnRampTransaction OnRampTransaction[]
  sentTransfers     p2pTransfer[]       @relation(name: "FromUserRelation")
  receivedTransfers p2pTransfer[]       @relation(name: "ToUserRelation")
}
```

#### 2. `Balance`
Stores live wallet funds associated with a user.
```prisma
model Balance {
  id      Int   @id @default(autoincrement())
  userId  Int   @unique
  amount  Int   // Unlocked spendable balance in paise
  locked  Int?  // Funds currently held or in pending transfer
  user    User  @relation(fields: [userId], references: [id])
}
```

#### 3. `OnRampTransaction`
Tracks money deposited from external banks into the wallet.
```prisma
model OnRampTransaction {
  id        Int          @id @default(autoincrement())
  status    onRampStatus // Processing | Success | Failure
  token     String       @unique
  provider  String       // e.g. "HDFC Bank", "Axis Bank"
  amount    Int          // Amount in paise
  startTime DateTime
  userId    Int
  user      User         @relation(fields: [userId], references: [id])
}
```

#### 4. `p2pTransfer`
Audit log of direct wallet transfers between two users.
```prisma
model p2pTransfer {
  id         Int      @id @default(autoincrement())
  amount     Int      // Amount in paise
  timestamp  DateTime
  fromUserId Int
  fromUser   User     @relation(fields: [fromUserId], references: [id], name: "FromUserRelation")
  toUserId   Int
  toUser     User     @relation(fields: [toUserId], references: [id], name: "ToUserRelation")
}
```

#### 5. `Merchant`
Merchant profiles supporting OAuth providers.
```prisma
model Merchant {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  auth_type AuthType // Google | Github
}
```

---

## 💻 Client Singleton Usage

Import the initialized `prisma` client directly from `@repo/db`:

```typescript
import db from "@repo/db";

// Example: Fetch user with their balance
const user = await db.user.findUnique({
  where: { number: "9876543210" },
  include: { balance: true }
});
```

You can also import types directly:
```typescript
import { User, Balance, onRampStatus } from "@repo/db";
```

### How the Singleton Works
In [`index.ts`](index.ts), the client caches the `PrismaClient` on Node's `globalThis` in development environments:
```typescript
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
```

---

## 🛠 Available Scripts & Commands

Run these scripts inside `packages/db`:

| Command | Action |
|---|---|
| `npm run build` | Generates the Prisma client and compiles TypeScript to JS (`prisma generate && tsc`) |
| `npm run generate` | Generates the Prisma client files only |
| `npm run check-types` | Type-checks the package without emitting files |
| `npx prisma db push` | Pushes the schema directly to your PostgreSQL database (prototyping) |
| `npx prisma migrate dev` | Creates and runs database migrations |
| `npx prisma studio` | Opens an interactive web GUI to inspect and edit database records |

---

## 🔑 Environment Configuration

Create a `.env` file in `packages/db/.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/rupeeone?schema=public"
```
