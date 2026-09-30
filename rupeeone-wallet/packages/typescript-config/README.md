# Shared TypeScript Configurations (`@repo/typescript-config`)

A centralized package housing reusable `tsconfig.json` configurations for different targets (Next.js, Node.js packages, React component libraries) across the RupeeOne Wallet monorepo.

---

## 📑 Available Configurations

### 1. `@repo/typescript-config/base.json`
The foundational configuration applied across all packages.
- **Target**: `ES2022`
- **Module**: `NodeNext`
- **Module Resolution**: `NodeNext`
- **Features**: Strict mode (`strict: true`), declaration files enabled (`declaration: true`), JSON module resolution, and forced module detection.

### 2. `@repo/typescript-config/nextjs.json`
Tailored for Next.js applications (such as `apps/user-app`).
- Extends `base.json`
- **Module**: `ESNext`
- **Module Resolution**: `Bundler`
- **JSX**: `preserve`
- Includes Next.js compiler plugin (`plugins: [{ "name": "next" }]`).

### 3. `@repo/typescript-config/react-library.json`
Designed for React component packages (such as `packages/ui`).
- Extends `base.json`
- **JSX**: `react-jsx`
- Configured to emit compiled declaration maps and types to `dist/`.

---

## 📦 How to Use

In any package's `tsconfig.json`, extend the appropriate base configuration:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "strictNullChecks": true
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```
