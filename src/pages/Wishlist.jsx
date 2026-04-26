import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { items, removeFromWishlist, totalItems } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <h2>Your Wishlist</h2>
        <div className="empty-wishlist">
          <Heart size={64} style={{ color: '#cbd5e0', marginBottom: '1rem' }} />
          <h3>Your wishlist is empty</h3>
          <p>Save items you love by clicking the heart icon on products</p>
          <Link to="/products" className="browse-products-btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist ({totalItems} items)</h2>

      <div className="wishlist-items">
        {items.map(item => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.name} className="wishlist-item-image" />

            <div className="wishlist-item-details">
              <Link to={`/product/${item.id}`} className="wishlist-item-name">
                {item.name}
              </Link>
              <p className="wishlist-item-category">{item.category}</p>
              <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="wishlist-actions">
              <button
                className="add-to-cart-from-wishlist"
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item.id);
                }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                className="remove-from-wishlist-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Heart size={18} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
