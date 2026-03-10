export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12">
        <h1 className="text-4xl font-bold mb-4">Microservices Platform</h1>
        <p className="text-xl mb-6">A scalable architecture demonstrating Account Management, Product Catalog, and Order Processing</p>
        <div className="flex gap-4 flex-wrap">
          <a href="/accounts" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Manage Accounts
          </a>
          <a href="/products" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition border border-blue-500">
            Browse Products
          </a>
          <a href="/orders" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition border border-blue-500">
            Create Orders
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Architecture Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Account Service */}
          <div className="card p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Account Service</h3>
            <p className="text-gray-600 mb-4">Manages user accounts with PostgreSQL persistence</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Create & retrieve accounts</li>
              <li>✓ Link orders to accounts</li>
              <li>✓ RESTful via gRPC service</li>
            </ul>
          </div>

          {/* Catalog Service */}
          <div className="card p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Catalog Service</h3>
            <p className="text-gray-600 mb-4">Product catalog powered by Elasticsearch</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Search products</li>
              <li>✓ Full-text indexing</li>
              <li>✓ Elastic scaling</li>
            </ul>
          </div>

          {/* Order Service */}
          <div className="card p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.115 1.738-4.323A1 1 0 0119 4v2h1a1 1 0 110 2h-1v3h1a1 1 0 110 2h-1v3h1a1 1 0 110 2h-1v2a1 1 0 01-1.592.814l-1.738-4.323L11 15.677V17a1 1 0 11-2 0v-1.323l-3.954-1.115-1.738 4.323A1 1 0 011 16v-2H0a1 1 0 110-2h1V9H0a1 1 0 110-2h1V4a1 1 0 011.592-.814l1.738 4.323L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Order Service</h3>
            <p className="text-gray-600 mb-4">Order processing with PostgreSQL</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Create orders</li>
              <li>✓ Multi-product orders</li>
              <li>✓ Cross-service communication</li>
            </ul>
          </div>
        </div>
      </section>

      {/* GraphQL API */}
      <section className="card p-8">
        <h2 className="text-2xl font-bold mb-4">API Gateway</h2>
        <p className="text-gray-600 mb-6">A unified GraphQL API that orchestrates all microservices</p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
          <pre className="text-sm text-gray-700">
{`query {
  accounts {
    id
    name
    orders { totalPrice }
  }
  products {
    id
    name
    price
  }
}`}
          </pre>
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Go', 'gRPC', 'GraphQL', 'PostgreSQL', 'Elasticsearch', 'Docker', 'React', 'Next.js'].map((tech) => (
            <div key={tech} className="card p-4 text-center">
              <p className="font-semibold text-gray-800">{tech}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
