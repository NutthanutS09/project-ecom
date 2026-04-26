import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Mail, Send } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { useToast } from '../context/ToastContext';

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const { addToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      addToast('Please enter your email', 'error');
      return;
    }
    addToast('Thanks for subscribing!', 'success');
    setNewsletterEmail('');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    addToast('Message sent! We will get back to you soon.', 'success');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopHub</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="hero-btn">
            Shop Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <Truck size={40} />
          <h3>Free Shipping</h3>
          <p>On all orders over $50</p>
        </div>
        <div className="feature">
          <Shield size={40} />
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div className="feature">
          <Headphones size={40} />
          <h3>24/7 Support</h3>
          <p>Dedicated customer support</p>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/products" className="view-all">
          View All Products <ArrowRight size={18} />
        </Link>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <Mail size={48} className="newsletter-icon" />
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest updates on new products and upcoming sales</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Your name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="your@email.com"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="How can we help you?"
                rows="5"
                className="form-textarea"
              />
            </div>
            <button type="submit" className="contact-btn">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
