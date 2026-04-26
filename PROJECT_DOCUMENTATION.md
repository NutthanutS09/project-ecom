# ShopHub - E-Commerce Application

## Project Overview

ShopHub is a modern React-based e-commerce web application built with Vite, React Router, and Context API for state management.

## Features

### Core Features
- **Product Catalog** - Browse products with category filtering
- **Product Search** - Search products by name or description
- **Shopping Cart** - Add/remove items with localStorage persistence
- **Wishlist** - Save favorite products for later
- **Product Details** - View detailed product information

### New Features Added
- **Wishlist/Favorites System** - Users can save products to a wishlist
- **Product Search** - Real-time search functionality
- **Toast Notifications** - User feedback for actions
- **Newsletter Subscription** - Email subscription form
- **Contact Form** - Customer support contact form

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 8
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **State Management:** React Context API
- **Styling:** CSS3

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with cart/wishlist icons
│   ├── ProductCard.jsx     # Reusable product card component
│   └── CartItems.jsx       # Shopping cart items display
├── context/
│   ├── CartContext.jsx     # Shopping cart state management
│   ├── WishlistContext.jsx # Wishlist state management
│   └── ToastContext.jsx    # Toast notification system
├── data/
│   └── products.js         # Product data and categories
├── pages/
│   ├── Home.jsx            # Homepage with hero, features, products
│   ├── Products.jsx        # All products with search and filters
│   ├── ProductDetail.jsx   # Individual product page
│   ├── Cart.jsx            # Shopping cart page
│   └── Wishlist.jsx        # Wishlist page
├── App.jsx                 # Main app component with routing
├── App.css                 # Application styles
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Homepage with featured products |
| `/products` | Products | Product catalog with search/filter |
| `/product/:id` | ProductDetail | Individual product details |
| `/cart` | Cart | Shopping cart |
| `/wishlist` | Wishlist | Saved items |

## State Management

### CartContext
- `items` - Array of cart items
- `addToCart(product, quantity)` - Add item to cart
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Empty the cart
- `totalItems` - Total item count
- `totalPrice` - Total price

### WishlistContext
- `items` - Array of wishlist items
- `addToWishlist(product)` - Add to wishlist
- `removeFromWishlist(productId)` - Remove from wishlist
- `isInWishlist(productId)` - Check if product is saved
- `totalItems` - Total saved items

### ToastContext
- `addToast(message, type)` - Show notification (success/error/info)

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Component Details

### Header
- Logo with link to home
- Navigation links (Home, Products)
- Wishlist icon with badge count
- Cart icon with badge count

### ProductCard
- Product image
- Category badge
- Product name (linkable)
- Star rating with review count
- Price
- Add to cart button
- Wishlist toggle button

### Home Page
- Hero section with CTA
- Feature highlights (Shipping, Payment, Support)
- Featured products grid
- Newsletter subscription
- Contact form

## Styling

The application uses a consistent color scheme:
- Primary: `#6b46c1` (Purple)
- Secondary: `#9f7aea` (Light Purple)
- Success: `#48bb78` (Green)
- Error: `#f56565` (Red)
- Info: `#4299e1` (Blue)
- Wishlist: `#e53e3e` (Red)

## Responsive Design

The application is fully responsive with breakpoints at 768px for mobile devices:
- Mobile-friendly navigation
- Stacked product grids
- Touch-friendly buttons
- Adaptive layouts

## Local Storage

Data persisted in localStorage:
- `cart` - Shopping cart items
- `wishlist` - Saved wishlist items

## Future Enhancements

Potential features for future development:
- User authentication
- Checkout process with payment integration
- Order history
- Product reviews and ratings
- Admin dashboard
- Product image gallery
- Related products suggestions
- Dark mode toggle
