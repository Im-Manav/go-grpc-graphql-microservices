'use client';

import { useState, useEffect } from 'react';
import { graphqlClient } from '../lib/client';
import { GET_ACCOUNTS, GET_PRODUCTS, CREATE_ORDER } from '../lib/graphql';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Account {
  id: string;
  name: string;
  orders: any[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function OrdersPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    const { data: accountsData, error: accountsError } = await graphqlClient(GET_ACCOUNTS, {
      pagination: { skip: 0, take: 10 }
    });
    
    const { data: productsData, error: productsError } = await graphqlClient(GET_PRODUCTS, {
      pagination: { skip: 0, take: 20 }
    });

    if (accountsError) setError(accountsError);
    if (productsError) setError(productsError);
    
    if (accountsData?.accounts) setAccounts(accountsData.accounts);
    if (productsData?.products) setProducts(productsData.products);
    
    setLoading(false);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCreateOrder = async () => {
    if (!selectedAccountId || cart.length === 0) {
      setError('Please select an account and add items to cart');
      return;
    }

    setCreating(true);
    setError(null);

    const { data, error: err } = await graphqlClient(CREATE_ORDER, {
      order: {
        accountId: selectedAccountId,
        products: cart.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      }
    });

    if (err) {
      setError(err);
    } else if (data?.createOrder) {
      setCart([]);
      setSelectedAccountId('');
      alert('Order created successfully!');
      fetchData();
    }
    setCreating(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Order Management</h1>
        <p className="text-gray-600">Create orders by selecting an account and adding products</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Available Products ({products.length})</h2>
              {products.length === 0 ? (
                <p className="text-gray-500">No products available</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <h3 className="font-bold mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-green-600">${product.price.toFixed(2)}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cart & Checkout Section */}
          <div className="space-y-4">
            {/* Account Selection */}
            <div className="card p-6">
              <h3 className="font-bold mb-3">Select Account</h3>
              {accounts.length === 0 ? (
                <p className="text-gray-500 text-sm">No accounts available</p>
              ) : (
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="input-field"
                  disabled={creating}
                >
                  <option value="">Choose an account...</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Cart Summary */}
            <div className="card p-6">
              <h3 className="font-bold mb-4">Shopping Cart ({cart.length})</h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">Cart is empty</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded text-sm hover:bg-gray-200"
                          disabled={creating}
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded text-sm hover:bg-gray-200"
                          disabled={creating}
                        >
                          +
                        </button>
                        <span className="text-sm font-bold text-green-600 min-w-fit">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Total */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">${cartTotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCreateOrder}
                  disabled={creating || !selectedAccountId || cart.length === 0}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creating Order...' : 'Create Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
