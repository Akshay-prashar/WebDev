# RupeeOne Web Application (`apps/user-app`)

The customer-facing digital wallet portal built on **Next.js 16 (App Router)** and **React 19**, powered by **Turbopack**, **Tailwind CSS v4**, and **NextAuth.js**.

---

## 📑 Table of Contents

- [Features](#-features)
- [Directory Structure](#-directory-structure)
- [Pages & Routing](#-pages--routing)
- [Authentication Flow (NextAuth)](#-authentication-flow-nextauth)
- [Server Actions & Validations](#-server-actions--validations)
- [Component Structure](#-component-structure)
- [State Management (Redux Toolkit)](#-state-management-redux-toolkit)
- [Styling (Tailwind CSS v4)](#-styling-tailwind-css-v4)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)

---

## ✨ Features

- **User Authentication**: Secure credentials-based authentication with password hashing using `bcrypt`.
- **Bank On-Ramp Deposits**: Simulated bank transfer flow with HDFC and Axis Bank providers.
- **P2P Instant Transfers**: Direct wallet-to-wallet money transfers using recipient phone numbers.
- **Real-Time Balances**: Live computation of unlocked vs. locked funds.
- **Transaction Ledgers**: Separate views for inbound bank credits and peer-to-peer payments.
- **Responsive Dashboard**: Persistent sidebar navigation with accessible SVG icons.

---

## 📂 Directory Structure

```text
apps/user-app/
├── app/
│   ├── (dashboard)/              # Authenticated layout route group
│   │   ├── layout.tsx            # Protected shell with SideBar navigation
│   │   ├── dashboard/page.tsx    # User welcome & summary
│   │   ├── P2Ptransfer/page.tsx  # P2P send form & transaction list
│   │   ├── transactions/page.tsx # Split-view for P2P & on-ramp history
│   │   └── transfer/page.tsx     # Add money & live balance cards
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth route handler
│   │   │   └── route.ts
│   │   └── user/                 # Session details API endpoint
│   │       └── route.ts
│   ├── lib/
│   │   ├── actions/              # Next.js Server Actions
│   │   │   ├── createOnRampTransaction.ts
│   │   │   ├── p2pTransfer.ts
│   │   │   └── signup.ts
│   │   └── auth.ts               # NextAuth options & CredentialsProvider
│   ├── signin/page.tsx           # Custom sign-in page
│   ├── signup/page.tsx           # Custom registration page
│   ├── AuthProvider.tsx          # Client NextAuth SessionProvider wrapper
│   ├── StoreProvider.tsx         # Client Redux Provider wrapper
│   ├── ClintAppbar.tsx           # Interactive client header
│   ├── globals.css               # Tailwind CSS v4 root stylesheet
│   ├── layout.tsx                # Root layout wrapping global providers
│   └── page.tsx                  # Home page / session-based redirector
├── components/                   # Application-specific UI components
│   ├── AddMoneyCard.tsx          # Bank deposit form with provider selection
│   ├── BalanceCard.tsx           # Balance breakdown (unlocked, locked, total)
│   ├── OnRampTransaction.tsx     # On-ramp history list with status badges
│   ├── P2PSendMoney.tsx          # P2P transfer form with instant state update
│   ├── p2pTransactions.tsx       # P2P transaction history list
│   ├── SideBarItem.tsx           # Sidebar navigation button
│   ├── SigninpageComponent.tsx   # Sign-in form component
│   └── SignupComponent.tsx       # Sign-up form component
├── package.json
└── tsconfig.json
```

---

## 🗺 Pages & Routing

| Path | Access | Description |
|---|---|---|
| `/` | Public | Entry route. Redirects authenticated users to `/dashboard` and guests to `/api/auth/signin`. |
| `/signin` | Public | Custom login screen accepting phone number, email, and password. |
| `/signup` | Public | Registration screen. Creates user account and seeds an initial zero-balance. |
| `/dashboard` | Protected | User home screen displaying authenticated user profile details. |
| `/transfer` | Protected | Deposit money via supported netbanking providers and inspect live balances. |
| `/P2Ptransfer` | Protected | Send money directly to another registered phone number and view P2P history. |
| `/transactions` | Protected | Side-by-side overview of all inbound bank on-ramps and P2P transfers. |

---

## 🔐 Authentication Flow (NextAuth)

Authentication is handled through **NextAuth.js v4** configured in [`app/lib/auth.ts`](app/lib/auth.ts):

- **Provider**: `CredentialsProvider` accepting `phone`, `email`, and `password`.
- **Validation**:
  1. Checks if the user exists by phone `number`.
  2. Verifies the password using `bcrypt.compare`.
  3. Returns user profile `{ id, name, email }` on match.
- **Session Strategy**: JWT session cookies. The `session` callback injects the database `id` into `session.user.id`.
- **Appbar Integration**: [`ClintAppbar.tsx`](app/ClintAppbar.tsx) invokes `signIn()` or `signOut()` to transition users in and out of authenticated sessions.

---

## 🛠 Server Actions & Validations

Data mutations are processed via Next.js Server Actions with strict input validation using **Zod**:

### 1. `signup(InputData)`
- **File**: `app/lib/actions/signup.ts`
- **Schema**:
  ```ts
  const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    number: z.string().regex(/^[6-9]\d{9}$/, "Must be valid 10-digit Indian phone number"),
    password: z.string().min(6)
  });
  ```
- **Atomicity**: Uses `db.$transaction` to create the `User` and create an initialized `Balance` record (`amount: 0`) simultaneously.

### 2. `createOnRampTransaction(amount, provider)`
- **File**: `app/lib/actions/createOnRampTransaction.ts`
- **Schema**:
  ```ts
  const createOnRampTransactionSchema = z.object({
    amount: z.number().positive(),
    provider: z.string().min(1)
  });
  ```
- **Execution**: Checks user session, generates a random unique `token`, and stores an `onRampTransaction` with `"Processing"` status and amount in paise (`amount * 100`).

### 3. `p2pTransfer(number, amount)`
- **File**: `app/lib/actions/p2pTransfer.ts`
- **Schema**:
  ```ts
  const p2pTransferSchema = z.object({
    number: z.string().regex(/^[6-9]\d{9}$/),
    amount: z.number().positive()
  });
  ```
- **Execution**:
  - Verifies session and confirms recipient is not the sender.
  - Opens `db.$transaction` with row-level locking:
    ```sql
    SELECT "amount" FROM "Balance" WHERE "userId" = ${fromUserId} FOR UPDATE;
    ```
  - Validates sufficient balance, debits sender, credits receiver, and inserts `p2pTransfer` record.

---

## 🧩 Component Structure

Consumes prebuilt UI primitives from `@repo/ui`:

- **`AddMoneyCard`**: Composed of `TextInput`, `Select`, and `Button` to configure bank deposits.
- **`BalanceCard`**: Displays Unlocked, Locked, and Total balances computed from stored paise (`amount / 100`).
- **`P2PSendMoney`**: Controlled form with loading states and real-time result messages.
- **`SideBarItem`**: Reusable navigation pill that detects active pathname.

---

## 📦 State Management (Redux Toolkit)

Global state is powered by `@repo/store`:
- Wrapped in `StoreProvider.tsx` using `useRef` to maintain store identity across React renders.
- Slices available:
  - `counter`: Demo numerical counter slice (`increment`, `decrement`).
  - `inputSlice`: Reactive text input cache (`setValue`, `resetValue`).

---

## 🎨 Styling (Tailwind CSS v4)

Tailwind CSS v4 is configured in [`app/globals.css`](app/globals.css):

```css
@import "tailwindcss";
@import "@repo/tailwind-config";
@source "../../../packages/ui/src";
```

The `@source` directive tells the Tailwind v4 engine to scan the shared `@repo/ui` package directory for utility classes, eliminating the need to compile separate CSS bundles in development.

---

## 🔑 Environment Variables

Create `.env` in `apps/user-app/.env`:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/rupeeone?schema=public"
```

---

## 🚀 Running Locally

```bash
# From repository root
npm run dev --filter=web

# Or directly in this folder
cd apps/user-app
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if specified in port script).
