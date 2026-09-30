# Bank Webhook Service (`apps/bank-webhook`)

A lightweight, high-reliability microservice built with **Express.js (v5)** and **Prisma ORM** that simulates a banking payment gateway webhook (e.g., HDFC Netbanking). It securely processes payment settlements, prevents double-spending, and credits funds to users' wallet balances.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Endpoint Specification](#-endpoint-specification)
- [Concurrency & Double-Spending Prevention](#-concurrency--double-spending-prevention)
- [How to Test the Webhook](#-how-to-test-the-webhook)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)

---

## 🏛 Overview

When a user initiates an "Add Money" transfer in `apps/user-app`, the system creates an `OnRampTransaction` with a unique `token` in `"Processing"` status. The user is then redirected to the bank's netbanking portal.

Once the payment is settled by the bank, this webhook service is notified via a `POST` request to `/hdfcWebhook`. The service verifies the authenticity of the transaction, prevents race conditions, and atomically credits the user's `Balance`.

---

## 📡 Endpoint Specification

### `POST /hdfcWebhook`

Processes a bank payment capture callback.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body
```json
{
  "token": "0.4578129384712",
  "userId": "1",
  "amount": "50000"
}
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `token` | `string` | Yes | Unique transaction token generated during the on-ramp creation. |
| `userId` | `string` \| `number` | Yes | The ID of the recipient user in the database. |
| `amount` | `string` \| `number` | Yes | The transaction amount in **paise** (`₹500` = `50000`). |

#### Responses

- **`200 OK` (Payment Captured)**:
  ```json
  {
    "message": "Captured"
  }
  ```

- **`400 Bad Request` (Validation or Concurrency Failure)**:
  ```json
  {
    "message": "Failed"
  }
  ```

---

## 🔒 Concurrency & Double-Spending Prevention

In high-concurrency environments, payment gateways can fire duplicate webhooks, or network timeouts may cause automated retries. Without proper locking, this can result in crediting the user balance twice.

To ensure **strict atomicity and idempotency**, the webhook executes the following logic inside a PostgreSQL interactive transaction (`db.$transaction`):

### 1. Row-Level Lock (`FOR UPDATE`)
```sql
SELECT "id", "userId", "amount", "status" 
FROM "onRampTransaction" 
WHERE "token" = ${paymentinformation.token} 
FOR UPDATE;
```
By acquiring an exclusive row lock (`FOR UPDATE`), any concurrent webhook attempts targeting the same token are queued until the first transaction completes.

### 2. State Validation
```ts
if (!transaction) {
  throw new Error("Transaction not found");
}
if (transaction.status !== "Processing") {
  throw new Error("Transaction already processed");
}
if (transaction.userId !== Number(paymentinformation.userId) || transaction.amount !== Number(paymentinformation.amount)) {
  throw new Error("Invalid payment information");
}
```
If the status has already transitioned away from `"Processing"` (e.g., to `"Success"`), the request is rejected immediately without updating the balance.

### 3. Atomic Updates
```ts
// 1. Credit the user's balance
await tx.balance.update({
  where: { userId: transaction.userId },
  data: { amount: { increment: transaction.amount } }
});

// 2. Mark the transaction as Success
await tx.onRampTransaction.update({
  where: { id: transaction.id },
  data: { status: "Success" }
});
```

---

## 🧪 How to Test the Webhook

You can test the webhook using `curl` or Postman:

```bash
curl -X POST http://localhost:3001/hdfcWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_TRANSACTION_TOKEN",
    "userId": "1",
    "amount": "50000"
  }'
```

---

## 🔑 Environment Variables

The webhook inherits the database connection from `@repo/db`:

```env
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/rupeeone?schema=public"
```

---

## 🚀 Running Locally

```bash
# From workspace root
npm run dev --filter=bank-webhook

# Or directly in this directory
cd apps/bank-webhook
npx tsx src/index.ts
```

The server will listen at `http://localhost:3001`.
