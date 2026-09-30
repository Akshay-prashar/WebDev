# Redux Store Package (`@repo/store`)

A centralized global state management package built with **Redux Toolkit (RTK)** and **React-Redux**, designed to be consumed by Next.js applications and other frontend packages across the RupeeOne Wallet monorepo.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Store Architecture](#-store-architecture)
- [Available Slices](#-available-slices)
- [Typed Hooks](#-typed-hooks)
- [Integration with Next.js App Router](#-integration-with-nextjs-app-router)
- [Available Scripts](#-available-scripts)

---

## 🏛 Overview

This package decouples global state definitions from individual applications. By standardizing Redux Toolkit in a shared workspace package:
- Multiple apps can share state slices and business logic.
- Type definitions for `RootState` and `AppDispatch` are strictly enforced.
- Store setup is preconfigured to support Next.js App Router's SSR and client hydration architecture.

---

## ⚙️ Store Architecture

In [`src/store.ts`](src/store.ts), a factory function `makeStore()` instantiates the store:

```typescript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice.js";
import inputSlice from "./slices/inputSlice.js";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      inputSlice: inputSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
```

---

## 🍰 Available Slices

### 1. `counterSlice` ([`src/slices/counterSlice.ts`](src/slices/counterSlice.ts))
Tracks integer counters across client views.

- **State**: `{ value: number }` (initial: `0`)
- **Actions**:
  - `increment()`: Increments the counter by 1.
  - `decrement()`: Decrements the counter by 1.

```typescript
import { increment, decrement } from "@repo/store";
dispatch(increment());
```

### 2. `inputSlice` ([`src/slices/inputSlice.ts`](src/slices/inputSlice.ts))
Manages active search/input query strings.

- **State**: `{ value: string }` (initial: `""`)
- **Actions**:
  - `setValue(string)`: Updates the input string.
  - `resetValue()`: Resets the input string back to `""`.

```typescript
import { setValue, resetValue } from "@repo/store";
dispatch(setValue("New Query"));
```

---

## 🪝 Typed Hooks

Instead of plain `useDispatch` and `useSelector`, import pre-typed hooks from `@repo/store/hooks`:

```typescript
import { useAppDispatch, useAppSelector } from "@repo/store/hooks";

export function CounterWidget() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
```

---

## 🔌 Integration with Next.js App Router

Next.js App Router requires creating a client-side provider wrapper to ensure a new store instance is created per request on the server, while remaining stable on the client.

In your application's `StoreProvider.tsx` (e.g., [`apps/user-app/app/StoreProvider.tsx`](../../apps/user-app/app/StoreProvider.tsx)):

```tsx
"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@repo/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

Wrap your root layout in `StoreProvider`:

```tsx
// app/layout.tsx
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
```

---

## 🛠 Available Scripts

Run these inside `packages/store`:

| Command | Action |
|---|---|
| `npm run build` | Compiles TypeScript source to `dist/` declarations and JS (`tsc`) |
