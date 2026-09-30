# RupeeOne Wallet 💸

A full-stack, enterprise-grade digital wallet and peer-to-peer (P2P) payment platform built as a high-performance **Turborepo monorepo**. The platform enables users to securely add money via simulated netbanking, transfer funds directly between phone numbers in real-time, view transaction histories, and manage balances with strict atomicity and concurrency control.

---

## 📑 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Monorepo Directory Structure](#-monorepo-directory-structure)
- [Tech Stack](#-tech-stack)
- [Database Architecture & Schema](#-database-architecture--schema)
- [Frontend Pages & User Flows](#-frontend-pages--user-flows)
- [API Routes & Server Actions](#-api-routes--server-actions)
- [Concurrency & Transaction Safety](#-concurrency--transaction-safety)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)

---

## 🏛 Architecture Overview

```
                      ┌───────────────────────────────────────────────┐
                      │              RupeeOne Monorepo                │
                      │                  (Turborepo)                  │
                      └───────────────────────┬───────────────────────┘
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     ▼                                                 ▼
        ┌─────────────────────────┐                       ┌─────────────────────────┐
        │     apps/user-app       │                       │    apps/bank-webhook    │
        │  Next.js 16 (Turbopack) │                       │     Express.js (v5)     │
        │  Port: 3000 / 3001      │                       │     Port: 3001          │
        └────────────┬────────────┘                       └────────────┬────────────┘
                     │                                                 │
                     │         ┌─────────────────────────────┐         │
                     ├────────►│        @repo/ui             │         │
                     │         │ (Shared Component Library)  │         │
                     │         └─────────────────────────────┘         │
                     │                                                 │
                     │         ┌─────────────────────────────┐         │
                     ├────────►│       @repo/store           │         │
                     │         │  (Redux Toolkit Store)      │         │
                     │         └─────────────────────────────┘         │
                     │                                                 │
                     │         ┌─────────────────────────────┐         │
                     └────────►│         @repo/db            │◄────────┘
                               │ (Prisma 7 + PostgreSQL CLI) │
                               └──────────────┬──────────────┘
                                              ▼
                                 ┌─────────────────────────┐
                                 │   PostgreSQL Database   │
                                 │    (Neon / Supabase)    │
                                 └─────────────────────────┘
```

The system is separated into two deployable applications and four shared packages:

1. **`apps/user-app`**: A modern Next.js 16 App Router application providing the customer-facing digital wallet portal, including authentication, banking transfers, P2P payments, and transaction records.
2. **`apps/bank-webhook`**: An Express server acting as the banking gateway webhook processor that handles bank payment capture notifications and safely credit user balances with database-level row locking.
3. **`packages/db`**: Central database package providing a singleton Prisma Client (Prisma 7 with `@prisma/adapter-pg`) and schema definitions.
4. **`packages/store`**: Centralized Redux Toolkit state store exposing global state slices and custom typed hooks.
5. **`packages/ui`**: Shared React component library built with Tailwind CSS v4.
6. **`packages/tailwind-config` / `packages/typescript-config` / `packages/eslint-config`**: Shared configurations across the monorepo.

---

## 📂 Monorepo Directory Structure

```text
rupeeone-wallet/
├── apps/
│   ├── bank-webhook/                 # Express webhook server for bank on-ramp processing
│   │   ├── src/
│   │   │   └── index.ts              # /hdfcWebhook endpoint with row locking
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── user-app/                     # Next.js 16 App Router web client
│       ├── app/
│       │   ├── (dashboard)/          # Authenticated dashboard route group
│       │   │   ├── layout.tsx        # Dashboard layout with persistent sidebar
│       │   │   ├── dashboard/        # Account overview page
│       │   │   ├── P2Ptransfer/      # Send money P2P + transfer history
│       │   │   ├── transactions/     # Full transactions overview (P2P + OnRamp)
│       │   │   └── transfer/         # Add money via Netbanking + balance cards
│       │   ├── api/
│       │   │   ├── auth/[...nextauth]/ # NextAuth authentication handler
│       │   │   └── user/             # Session user endpoint
│       │   ├── lib/
│       │   │   ├── actions/          # Next.js Server Actions (p2pTransfer, signup, etc.)
│       │   │   └── auth.ts           # NextAuth configuration & CredentialsProvider
│       │   ├── signin/               # Custom sign-in page
│       │   ├── signup/               # Custom sign-up page
│       │   ├── layout.tsx            # Root layout with StoreProvider & SessionProvider
│       │   └── globals.css           # Tailwind v4 entrypoint with @source directives
│       ├── components/               # App-specific UI components
│       └── package.json
├── packages/
│   ├── db/                           # Prisma 7 schema, migrations, adapter & client
│   │   ├── prisma/
│   │   │   └── schema.prisma         # Data models and relations
│   │   ├── index.ts                  # Exported PrismaClient singleton
│   │   ├── package.json
│   │   └── turbo.json
│   ├── store/                        # Redux Toolkit state management
│   │   ├── src/
│   │   │   ├── slices/               # counterSlice, inputSlice
│   │   │   ├── hooks.ts              # useAppDispatch, useAppSelector
│   │   │   └── store.ts              # makeStore configuration
│   │   └── package.json
│   ├── ui/                           # Shared UI Component library
│   │   ├── src/
│   │   │   ├── components/           # Button, Card, TextInput, Select, Center
│   │   │   ├── AddMoneyCardComponents.tsx
│   │   │   ├── Appbar.tsx            # Navigation header component
│   │   │   └── styles.css
│   │   └── package.json
│   ├── tailwind-config/              # Shared Tailwind v4 tokens & theme
│   ├── typescript-config/            # Base tsconfigs (base, nextjs, react-library)
│   └── eslint-config/                # Shared ESLint rules
├── turbo.json                        # Turborepo task pipeline configuration
├── package.json                      # Root workspace scripts & devDependencies
└── README.md                         # Monorepo documentation
```

---

## 🚀 Tech Stack

| Domain | Technologies |
|---|---|
| **Frameworks** | Next.js 16.3.1 (React 19, Turbopack, App Router), Express.js 5.x |
| **Monorepo Tools** | Turborepo 2.x, npm workspaces |
| **Languages** | TypeScript 5.x / 7.x, Node.js (>=24) |
| **Database & ORM** | PostgreSQL, Prisma 7.10.0, `@prisma/adapter-pg`, `pg` |
| **Authentication** | NextAuth.js v4 (Credentials Provider with JWT sessions), bcrypt |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit` v2), `react-redux` v9 |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Validation** | Zod (schemas with regex validations for phone numbers and inputs) |

---

## 🗄 Database Architecture & Schema

The PostgreSQL database is defined and managed via Prisma in [`packages/db/prisma/schema.prisma`](packages/db/prisma/schema.prisma).

### Financial Currency Convention
> [!IMPORTANT]
> All amounts in the database are stored as **integers in the lowest currency denomination (Paise)**.
> - `1 INR = 100 paise` (e.g., `₹500` is stored as `50000`).
> - This avoids floating-point rounding errors during financial balance calculations.

### Data Models & Entity Relations

```mermaid
erDiagram
    USER ||--o{ BALANCE : "has"
    USER ||--o{ ON_RAMP_TRANSACTION : "creates"
    USER ||--o{ P2P_TRANSFER : "sends (fromUser)"
    USER ||--o{ P2P_TRANSFER : "receives (toUser)"

    USER {
        int id PK
        string email UK
        string name
        string number UK
        string password
    }

    BALANCE {
        int id PK
        int userId FK,UK
        int amount
        int locked
    }

    ON_RAMP_TRANSACTION {
        int id PK
        enum status
        string token UK
        string provider
        int amount
        datetime startTime
        int userId FK
    }

    P2P_TRANSFER {
        int id PK
        int amount
        datetime timestamp
        int fromUserId FK
        int toUserId FK
    }

    MERCHANT {
        int id PK
        string email UK
        string name
        enum auth_type
    }
```

### Models Summary

- **`User`**: Core user credentials and profile. Stores unique phone `number`, `email`, full `name`, and hashed `password`.
- **`Balance`**: One-to-one record for each user tracking unlocked spendable `amount` and `locked` funds.
- **`OnRampTransaction`**: Inbound bank transfer records. Tracks token identifiers, bank providers (e.g., `HDFC Bank`, `Axis Bank`), amount, and status (`Processing`, `Success`, `Failure`).
- **`p2pTransfer`**: Double-entry ledger of peer-to-peer transfers linking `fromUserId` (sender) and `toUserId` (recipient).
- **`Merchant`**: Dedicated merchant profiles with support for OAuth provider types (`Google`, `Github`).

---

## 🖥 Frontend Pages & User Flows

The user app (`apps/user-app`) provides the following interactive views:

### 1. Landing & Navigation (`/`)
- Checks the user's session via `getServerSession(AuthOptions)`.
- Redirects authenticated users to `/dashboard` and unauthenticated visitors to `/api/auth/signin` or `/signin`.

### 2. Authentication (`/signin` & `/signup`)
- **`/signup`**: User registration form requesting Name, Email, Phone Number, and Password. Creates a user account and immediately seeds an associated `Balance` row initialized to `0`.
- **`/signin`**: Credentials sign-in form using phone number/email and password, redirecting to `/dashboard` upon success.
- **Top AppBar (`ClintAppbar`)**: Global header showing the brand logo, user authentication status, and Login/Logout buttons.

### 3. Dashboard Overview (`/dashboard`)
- Authenticated overview welcoming the logged-in user with their profile name and quick navigation.

### 4. Add Money via Netbanking (`/transfer`)
- **Add Money Card**: Allows selecting a bank provider (`HDFC Bank`, `Axis Bank`) and inputting an amount in INR. Dispatches the `createOnRampTransaction` server action and redirects to the simulated bank gateway.
- **Balance Card**: Live summary of Unlocked Balance, Locked Balance, and Total Balance.
- **Recent On-Ramp Transactions**: Lists recent inbound deposit attempts with color-coded status badges (`Success`, `Processing`, `Failure`).

### 5. Peer-to-Peer Transfer (`/P2Ptransfer`)
- **Send Money Card**: Input field for recipient's 10-digit mobile number and transfer amount in INR. Initiates `p2pTransfer` with real-time feedback.
- **P2P History Card**: Chronological record showing transfers with green `+Rs` (received) or red `-Rs` (sent) indicators.

### 6. Transactions History (`/transactions`)
- Split-column layout displaying both recent Peer-to-Peer transfers and Bank On-Ramp deposits side-by-side.

---

## ⚡ API Routes & Server Actions

### 1. HTTP API Routes

#### `GET /api/user`
Returns the currently authenticated user's session payload.
- **Success (200)**: `{ user: { id, name, email } }`
- **Unauthorized (403)**: `{ message: "You are not Logged in" }`

#### `GET / POST /api/auth/[...nextauth]`
NextAuth catch-all handler for login, logout, CSRF token generation, and session management.

#### `POST /hdfcWebhook` (`apps/bank-webhook` on port `3001`)
Bank webhook endpoint that receives payment settlement confirmations and credits user accounts.
- **Request Body**:
  ```json
  {
    "token": "0.123456789",
    "userId": "1",
    "amount": "50000"
  }
  ```
- **Response**:
  - `200 OK`: `{"message": "Captured"}`
  - `400 Bad Request`: `{"message": "Failed"}`

---

### 2. Next.js Server Actions

All mutations are implemented using secure Next.js Server Actions located in [`apps/user-app/app/lib/actions/`](apps/user-app/app/lib/actions/).

#### `signup(InputData)`
- **File**: `apps/user-app/app/lib/actions/signup.ts`
- **Validation**:
  ```ts
  z.object({
    name: z.string(),
    email: z.string().email(),
    number: z.string().regex(/^[6-9]\d{9}$/), // 10-digit Indian mobile format
    password: z.string()
  })
  ```
- **Flow**: Validates inputs, hashes password with `bcrypt` (10 salt rounds), creates user and zero-balance record in a single database transaction.

#### `createOnRampTransaction(amount, provider)`
- **File**: `apps/user-app/app/lib/actions/createOnRampTransaction.ts`
- **Validation**:
  ```ts
  z.object({
    amount: z.number().positive(),
    provider: z.string().min(1)
  })
  ```
- **Flow**: Verifies user session, generates a unique transaction token, and inserts an `OnRampTransaction` record with status `"Processing"` (amount multiplied by 100 to convert INR to paise).

#### `p2pTransfer(number, amount)`
- **File**: `apps/user-app/app/lib/actions/p2pTransfer.ts`
- **Validation**:
  ```ts
  z.object({
    number: z.string().regex(/^[6-9]\d{9}$/),
    amount: z.number().positive()
  })
  ```
- **Flow**: Checks user authentication, ensures sender is not transferring to themselves, acquires a row lock on sender balance, checks for sufficient funds, updates balances for both sender and recipient, and creates an audit record in `p2pTransfer`.

---

## 🔒 Concurrency & Transaction Safety

Handling money requires strict isolation to prevent race conditions and double-spending:

### 1. Peer-to-Peer Transfer Locking
In `p2pTransfer.ts`, multiple rapid transfer requests could lead to spending more money than available if read concurrently. To solve this, raw SQL row-level locking is used:
```sql
SELECT "amount" FROM "Balance" 
WHERE "userId" = ${fromUserId} 
FOR UPDATE;
```
`FOR UPDATE` locks the sender's balance row for the duration of the interactive transaction. Concurrent transfer attempts must wait until the first transaction commits or rolls back.

### 2. Bank Webhook Concurrency & Idempotency
In `apps/bank-webhook/src/index.ts`, payment webhook retries from banks can cause duplicate credits. The webhook handler protects against this:
1. Queries the on-ramp record using `FOR UPDATE`:
   ```sql
   SELECT "id", "userId", "amount", "status" 
   FROM "onRampTransaction" 
   WHERE "token" = ${paymentinformation.token} 
   FOR UPDATE;
   ```
2. Verifies `status === "Processing"`. If already processed (`"Success"`), the transaction is immediately rejected.
3. Validates that `userId` and `amount` match the record.
4. Increments user balance and updates status to `"Success"` in an atomic `$transaction`.

---

## 🔑 Environment Variables

Create `.env` files in the following locations:

### 1. Database Package: `packages/db/.env`
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rupeeone?schema=public"
```

### 2. User App: `apps/user-app/.env`
```env
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret"
DATABASE_URL="postgresql://user:password@localhost:5432/rupeeone?schema=public"
```

### 3. Bank Webhook App: `apps/bank-webhook/.env` (Optional)
```env
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/rupeeone?schema=public"
```

---

## 🛠 Getting Started

### Prerequisites
- **Node.js**: `v24+` (or active LTS)
- **Package Manager**: `npm v11+`
- **Database**: PostgreSQL (local or hosted e.g. Neon, Supabase, ElephantSQL)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Akshay-prashar/WebDev.git
cd WebDev-github/rupeeone-wallet
npm install
```

### 2. Set Up the Database
```bash
# Navigate to db package
cd packages/db

# Push schema to database
npx prisma db push

# Generate client and build package
npm run build

# Return to root
cd ../..
```

### 3. Build All Packages
```bash
npm run build
```

### 4. Start Development Servers
```bash
npm run dev
```
- **Web App**: [http://localhost:3000](http://localhost:3000) (or port configured in package scripts)
- **Bank Webhook**: [http://localhost:3001](http://localhost:3001)

---

## 📜 Available Scripts

Run these scripts from the repository root:

| Command | Action |
|---|---|
| `npm run build` | Builds all packages and apps using Turborepo (`turbo run build`) |
| `npm run dev` | Starts all applications in watch/development mode (`turbo run dev`) |
| `npm run check-types` | Type-checks all TypeScript packages and Next.js applications |
| `npm run lint` | Runs ESLint across all projects |
| `npm run format` | Formats all source files with Prettier |
