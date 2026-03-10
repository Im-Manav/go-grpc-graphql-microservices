import { useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">Microservices Demo</h1>
          </Link>
          
          <div className="hidden md:flex gap-8">
            <Link href="/accounts" className="text-gray-700 hover:text-blue-600 font-medium">Accounts</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">Products</Link>
            <Link href="/orders" className="text-gray-700 hover:text-blue-600 font-medium">Orders</Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-100 border-t">
            <Link href="/accounts" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Accounts</Link>
            <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Products</Link>
            <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Orders</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">Microservices Architecture</h3>
              <p className="text-gray-400">gRPC + GraphQL API Gateway</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Services</h3>
              <ul className="text-gray-400">
                <li>Account Service</li>
                <li>Catalog Service</li>
                <li>Order Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Technologies</h3>
              <ul className="text-gray-400">
                <li>Go, gRPC, GraphQL</li>
                <li>PostgreSQL, Elasticsearch</li>
                <li>React, Next.js</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Microservices Demo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
