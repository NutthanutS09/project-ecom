import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Store, Heart, LogOut, User, ShieldAlert, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { totalItems } = useCart();
  const { totalItems: totalWishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          {user?.email === 'admin' && (
            <>
              <Link to="/admin/products" className="nav-admin">
                <Package size={15} />
                Products
              </Link>
              <Link to="/admin/users" className="nav-admin">
                <ShieldAlert size={15} />
                Users
              </Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          <span className="header-user">
            <User size={15} />
            {user?.name}
          </span>
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
          <button className="logout-btn" onClick={handleLogout} title="Sign out">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
