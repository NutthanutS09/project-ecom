import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartItems() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-items">
      <h2>Shopping Cart</h2>

      <div className="cart-products">
        {items.map(item => (
          <div key={item.id} className="cart-product">
            <img src={item.image} alt={item.name} className="cart-product-image" />

            <div className="cart-product-details">
              <Link to={`/product/${item.id}`} className="cart-product-name">
                {item.name}
              </Link>
              <p className="cart-product-category">{item.category}</p>
              <p className="cart-product-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus size={16} />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus size={16} />
              </button>
            </div>

            <div className="cart-product-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}
