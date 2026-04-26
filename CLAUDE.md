# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite HMR)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

ShopHub is a React 19 + Vite e-commerce SPA. No backend — all product data is static in `src/data/products.js`.

**Context provider order** (in `App.jsx`) matters: `ToastProvider` → `WishlistProvider` → `CartProvider`. Both `CartContext` and `WishlistContext` persist their state to `localStorage`.

**State management** uses three React Contexts:
- `CartContext` — cart items, quantities, totals
- `WishlistContext` — saved/favorited products
- `ToastContext` — ephemeral UI notifications (success/error/info)

**Routing** via React Router DOM 7: `/` Home, `/products` catalog with search+filter, `/product/:id` detail, `/cart`, `/wishlist`.

**Styling** is plain CSS split between `index.css` (globals) and `App.css` (app-level). No CSS framework or CSS modules.

**Icons** use `lucide-react`.
