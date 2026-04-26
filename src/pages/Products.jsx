import { useState } from 'react';
import { Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';

export default function Products() {
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');


  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      <h2>All Products</h2>

      <div className="products-layout">
        <aside className="filters">
          <h3>Categories</h3>
          <ul>
            {categories.map(category => (
              <li key={category}>
                <button
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="products-content">
          <div className="search-and-count">
            <div className="search-container">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>
            <p className="results-count">{filteredProducts.length} products found</p>
          </div>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
