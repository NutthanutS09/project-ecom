# ShopHub - E-Commerce SPA

A fully featured e-commerce single-page application built with React 19 and Vite.

## Features

- **Product Catalog** — Browse all products with search by name and filter by category
- **Product Detail** — View full product info including images, price, description, and rating
- **Shopping Cart** — Add/remove items, adjust quantities, and see order totals in real time
- **Wishlist** — Save products to a personal wishlist and move them to cart anytime
- **Persistent State** — Cart and wishlist are saved to localStorage and survive page refresh
- **Toast Notifications** — Instant feedback when adding to cart, wishlist, or removing items

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with featured products |
| `/products` | Full catalog with search and category filter |
| `/product/:id` | Individual product detail page |
| `/cart` | Shopping cart with quantity controls and total |
| `/wishlist` | Saved/favorited products |

## Tech Stack

- **React 19** — UI library
- **Vite** — Build tool with HMR
- **React Router DOM 7** — Client-side routing
- **lucide-react** — Icons
- Plain CSS — No framework

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
