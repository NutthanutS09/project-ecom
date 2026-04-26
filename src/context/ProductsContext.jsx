import { createContext, useContext, useState } from 'react';
import { products as initialProducts, categories as initialCategories } from '../data/products';

const ProductsContext = createContext();

const PRODUCTS_KEY = 'admin_products';
const CATEGORIES_KEY = 'admin_categories';

const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => load(PRODUCTS_KEY, initialProducts));
  const [categories, setCategories] = useState(() => load(CATEGORIES_KEY, initialCategories));

  const persistProducts = (p) => { setProducts(p); save(PRODUCTS_KEY, p); };
  const persistCategories = (c) => { setCategories(c); save(CATEGORIES_KEY, c); };

  const addProduct = (form) => {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    persistProducts([...products, {
      id: newId,
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      image: form.image,
      description: form.description,
      rating: parseFloat(form.rating) || 0,
      reviews: parseInt(form.reviews) || 0,
    }]);
  };

  const updateProduct = (id, form) => {
    persistProducts(products.map(p => p.id === id ? {
      ...p,
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      image: form.image,
      description: form.description,
      rating: parseFloat(form.rating) || 0,
      reviews: parseInt(form.reviews) || 0,
    } : p));
  };

  const deleteProduct = (id) => persistProducts(products.filter(p => p.id !== id));

  const addCategory = (name) => {
    if (categories.includes(name)) return false;
    persistCategories([...categories, name]);
    return true;
  };

  const deleteCategory = (name) => {
    if (name === 'All') return;
    persistCategories(categories.filter(c => c !== name));
  };

  return (
    <ProductsContext.Provider value={{ products, categories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
}
