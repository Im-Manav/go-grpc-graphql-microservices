'use client';

import { useState, useEffect } from 'react';
import { graphqlClient } from '../lib/client';
import { GET_ACCOUNTS, CREATE_ACCOUNT } from '../lib/graphql';

interface Order {
  id: string;
  createdAt: string;
  totalPrice: number;
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }>;
}

interface Account {
  id: string;
  name: string;
  orders: Order[];
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAccountName, setNewAccountName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await graphqlClient(GET_ACCOUNTS, {
      pagination: { skip: 0, take: 10 }
    });
    
    if (err) {
      setError(err);
    } else if (data?.accounts) {
      setAccounts(data.accounts);
    }
    setLoading(false);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountName.trim()) return;

    setCreating(true);
    setError(null);
    const { data, error: err } = await graphqlClient(CREATE_ACCOUNT, {
      account: { name: newAccountName }
    });

    if (err) {
      setError(err);
    } else if (data?.createAccount) {
      setAccounts([...accounts, data.createAccount]);
      setNewAccountName('');
    }
    setCreating(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Accounts Management</h1>
        <p className="text-gray-600">Create and manage customer accounts</p>
      </div>

      {/* Create Account Form */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Create New Account</h2>
        <form onSubmit={handleCreateAccount} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter account name"
            value={newAccountName}
            onChange={(e) => setNewAccountName(e.target.value)}
            className="input-field flex-1"
            disabled={creating}
          />
          <button
            type="submit"
            disabled={creating}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">All Accounts ({accounts.length})</h2>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading accounts...</div>
        ) : accounts.length === 0 ? (
          <div className="card p-8 text-center text-gray-500">
            No accounts found. Create one to get started.
          </div>
        ) : (
          <div className="grid gap-4">
            {accounts.map((account) => (
              <div key={account.id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{account.name}</h3>
                    <p className="text-sm text-gray-500">ID: {account.id}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {account.orders.length} Orders
                  </span>
                </div>

                {/* Orders Section */}
                {account.orders.length > 0 ? (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-3">Orders:</h4>
                    <div className="space-y-3">
                      {account.orders.map((order) => (
                        <div key={order.id} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium">Order {order.id}</p>
                            <p className="text-sm font-bold text-green-600">${order.totalPrice.toFixed(2)}</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <div className="mt-2 text-xs text-gray-600">
                            <p className="font-medium">{order.products.length} items</p>
                            <ul className="mt-1">
                              {order.products.map((product) => (
                                <li key={product.id}>
                                  {product.name} x{product.quantity} @ ${product.price}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-4">No orders yet</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={fetchAccounts}
          disabled={loading}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Refresh Accounts
        </button>
      </div>
    </div>
  );
}
