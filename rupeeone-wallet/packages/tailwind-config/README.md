# Shared Tailwind Configuration (`@repo/tailwind-config`)

A shared configuration package providing consistent Tailwind CSS v4 design tokens, color palettes, and PostCSS plugins across all applications and component libraries in the RupeeOne Wallet monorepo.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Design Tokens & Theme](#-design-tokens--theme)
- [How to Use in Applications](#-how-to-use-in-applications)
- [PostCSS Setup](#-postcss-setup)

---

## 🏛 Overview

With **Tailwind CSS v4**, configuration is CSS-first using standard `@theme` blocks rather than a JavaScript `tailwind.config.js`.

This package exposes a shared stylesheet (`shared-styles.css`) that defines the platform's custom color scales and theme variables.

---

## 🎨 Design Tokens & Theme

In [`shared-styles.css`](shared-styles.css):

```css
@import "tailwindcss";

@theme {
  --color-blue-1000: #2a8af6;
  --color-purple-1000: #a853ba;
  --color-red-1000: #e92a67;
}
```

These custom colors are accessible across any consumer as utility classes:
- `bg-blue-1000` / `text-blue-1000`
- `bg-purple-1000` / `text-purple-1000`
- `bg-red-1000` / `text-red-1000`

---

## 📦 How to Use in Applications

1. Add `@repo/tailwind-config` to your package's `devDependencies`:
   ```json
   {
     "devDependencies": {
       "@repo/tailwind-config": "*"
     }
   }
   ```

2. Import the theme at the top of your application's CSS entrypoint (e.g., `app/globals.css` or `packages/ui/src/styles.css`):
   ```css
   @import "tailwindcss";
   @import "@repo/tailwind-config";
   ```

---

## ⚙️ PostCSS Setup

For Next.js and frontend applications requiring PostCSS preprocessing, this package also exports a preconfigured `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```
