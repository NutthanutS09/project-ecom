import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate('/products')}>
        <ArrowLeft size={20} /> Back to Products
      </button>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="rating">
            <Star size={20} fill="currentColor" />
            <span>{product.rating}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <button
            className="add-to-cart-large"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
