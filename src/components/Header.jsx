import { Link } from 'react-router-dom';
import { ShoppingCart, Store, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const { totalItems } = useCart();
  const { totalItems: totalWishlistItems } = useWishlist();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <Store size={28} />
          <span>ShopHub</span>
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>

        <div className="header-actions">
          <Link to="/wishlist" className="wishlist-link">
            <Heart size={24} />
            {totalWishlistItems > 0 && (
              <span className="wishlist-badge">{totalWishlistItems}</span>
            )}
          </Link>
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
