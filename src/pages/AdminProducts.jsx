import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, X, Package, Tag, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

const EMPTY_FORM = { name: '', price: '', category: '', image: '', description: '', rating: '4.0', reviews: '0' };

export default function AdminProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory } = useProducts();

  const [tab, setTab] = useState('products');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [catInput, setCatInput] = useState('');
  const [catError, setCatError] = useState('');

  useEffect(() => {
    if (user?.email !== 'admin') navigate('/');
  }, [user, navigate]);

  if (user?.email !== 'admin') return null;

  const nonAllCategories = categories.filter(c => c !== 'All');

  const openAdd = () => {
    setForm({ ...EMPTY_FORM, category: nonAllCategories[0] || '' });
    setFormError('');
    setModal({ mode: 'add' });
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      description: product.description,
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
    });
    setFormError('');
    setModal({ mode: 'edit', product });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.category) {
      setFormError('Name, price and category are required.');
      return;
    }
    if (modal.mode === 'add') {
      addProduct(form);
    } else {
      updateProduct(modal.product.id, form);
    }
    setModal(null);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const name = catInput.trim();
    if (!name) return;
    if (!addCategory(name)) {
      setCatError(`"${name}" already exists.`);
      return;
    }
    setCatInput('');
    setCatError('');
  };

  const field = (label, key, props = {}) => (
    <div className="auth-field">
      <label>{label}</label>
      <input
        className="form-input"
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        {...props}
      />
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-header">
        <Package size={28} className="admin-icon" />
        <h2>Product Management</h2>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab${tab === 'products' ? ' active' : ''}`} onClick={() => setTab('products')}>
          <Package size={15} /> Products
          <span className="admin-badge">{products.length}</span>
        </button>
        <button className={`admin-tab${tab === 'categories' ? ' active' : ''}`} onClick={() => setTab('categories')}>
          <Tag size={15} /> Categories
          <span className="admin-badge">{nonAllCategories.length}</span>
        </button>
      </div>

      {tab === 'products' && (
        <div className="admin-section">
          <div className="admin-section-header">
            <button className="admin-add-btn" onClick={openAdd}>
              <Plus size={16} /> Add Product
            </button>
          </div>
          {products.length === 0 ? (
            <div className="admin-empty"><Package size={40} /><p>No products yet.</p></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>
                        {p.image
                          ? <img src={p.image} alt={p.name} className="admin-product-thumb" />
                          : <div className="admin-product-thumb admin-no-img"><Package size={20} /></div>}
                      </td>
                      <td className="admin-product-name">{p.name}</td>
                      <td><span className="admin-cat-tag">{p.category}</span></td>
                      <td>${parseFloat(p.price).toFixed(2)}</td>
                      <td>⭐ {p.rating}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-edit-btn" onClick={() => openEdit(p)} title="Edit">
                            <Pencil size={15} />
                          </button>
                          <button className="admin-delete-btn" onClick={() => deleteProduct(p.id)} title="Delete">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'categories' && (
        <div className="admin-section">
          <form onSubmit={handleAddCategory} className="cat-add-form">
            <input
              type="text"
              value={catInput}
              onChange={e => { setCatInput(e.target.value); setCatError(''); }}
              placeholder="New category name..."
              className="cat-input"
            />
            <button type="submit" className="admin-add-btn"><Plus size={16} /> Add</button>
          </form>
          {catError && <div className="auth-error cat-err">{catError}</div>}
          <div className="cat-list">
            {nonAllCategories.length === 0 && (
              <p className="cat-empty">No categories yet.</p>
            )}
            {nonAllCategories.map(cat => (
              <div key={cat} className="cat-item">
                <Tag size={15} className="cat-icon" />
                <span>{cat}</span>
                <span className="cat-product-count">
                  {products.filter(p => p.category === cat).length} products
                </span>
                <button className="admin-delete-btn cat-del" onClick={() => deleteCategory(cat)} title="Delete category">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal.mode === 'add' ? 'Add Product' : 'Edit Product'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              {formError && <div className="auth-error">{formError}</div>}
              <div className="modal-grid">
                {field('Name', 'name', { placeholder: 'Product name' })}
                {field('Price ($)', 'price', { type: 'number', step: '0.01', min: '0', placeholder: '0.00' })}
                <div className="auth-field">
                  <label>Category</label>
                  <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {nonAllCategories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {field('Rating (0–5)', 'rating', { type: 'number', step: '0.1', min: '0', max: '5' })}
                <div className="auth-field modal-full">
                  {field('Image URL', 'image', { placeholder: 'https://...' })}
                </div>
                <div className="auth-field modal-full">
                  <label>Description</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Product description..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="modal-cancel-btn" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="auth-btn modal-save-btn">
                  <Check size={16} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
