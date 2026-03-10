'use client';

import { useState, useEffect } from 'react';
import { graphqlClient } from '../lib/client';
import { GET_PRODUCTS, CREATE_PRODUCT } from '../lib/graphql';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query?: string) => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await graphqlClient(GET_PRODUCTS, {
      pagination: { skip: 0, take: 20 },
      query: query || undefined
    });
    
    if (err) {
      setError(err);
    } else if (data?.products) {
      setProducts(data.products);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchQuery);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.price) return;

    setCreating(true);
    setError(null);
    const { data, error: err } = await graphqlClient(CREATE_PRODUCT, {
      product: {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price)
      }
    });

    if (err) {
      setError(err);
    } else if (data?.createProduct) {
      setProducts([...products, data.createProduct]);
      setFormData({ name: '', description: '', price: '' });
      setShowForm(false);
    }
    setCreating(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
        <p className="text-gray-600">Browse and manage products across all services</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchQuery('');
            fetchProducts();
          }}
          className="btn-secondary"
        >
          Reset
        </button>
      </form>

      {/* Create Product Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">All Products ({products.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {/* Create Product Form */}
      {showForm && (
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">Create New Product</h3>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                placeholder="e.g., Premium Laptop"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                disabled={creating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                placeholder="Product details..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="input-field"
                rows={3}
                disabled={creating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="input-field"
                disabled={creating}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={creating}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                {creating ? 'Creating...' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="card p-12 text-center text-gray-500">
          No products found. Try a different search or add a new product.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card p-6 hover:shadow-lg transition">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500">ID: {product.id}</p>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}
