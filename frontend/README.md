# Microservices Frontend

A professional React/Next.js frontend showcasing a microservices architecture with Account Management, Product Catalog, and Order Processing.

## Features

✨ **Modern UI** - Built with React 18, Next.js 14, and Tailwind CSS
🚀 **GraphQL Integration** - Connects to the backend GraphQL API
📱 **Responsive Design** - Works on desktop, tablet, and mobile
⚡ **Real-time Updates** - Create and manage accounts, products, and orders
🎯 **Professional Presentation** - Interview-ready demo

## Technology Stack

- **Frontend Framework**: React 18 + Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **GraphQL Client**: graphql-request
- **Package Manager**: npm/yarn

## Getting Started

### Prerequisites

- Node.js 18+ installed
- The backend services running (see parent README)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure the backend URL in `.env.local`:
```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/query
```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

### Production Build

Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── pages/              # Next.js pages and routes
│   ├── _app.tsx        # App wrapper
│   ├── index.tsx       # Home page
│   ├── accounts.tsx    # Account management
│   ├── products.tsx    # Product catalog
│   └── orders.tsx      # Order creation
├── components/         # Reusable components
│   └── Layout.tsx      # Main layout wrapper
├── lib/                # Utilities
│   ├── graphql.ts      # GraphQL queries and mutations
│   └── client.ts       # GraphQL client setup
├── styles/             # Global styles
│   └── globals.css     # Tailwind CSS
├── public/             # Static assets
└── package.json        # Dependencies

## Pages Overview

### 🏠 Home (/)
Displays the project overview with:
- Architecture overview
- Service descriptions
- Technology stack
- Quick navigation links

### 👥 Accounts (/accounts)
Account management features:
- View all accounts
- Create new accounts
- See associated orders for each account
- Real-time updates

### 📦 Products (/products)
Product catalog features:
- Browse all products
- Search products by name/description
- Create new products
- View product details and pricing

### 🛒 Orders (/orders)
Order creation workflow:
- Select an account
- Add products to cart
- Manage quantities
- View order total
- Create orders

## Features Demonstration

### For Interview

This frontend effectively demonstrates:

1. **Microservices Communication**
   - Account Service integration
   - Catalog Service integration
   - Order Service integration

2. **GraphQL API Gateway**
   - Unified interface for all services
   - Complex queries with nested data

3. **Full-Stack Development**
   - Modern React patterns
   - State management
   - Form handling
   - Error handling

4. **User Experience**
   - Intuitive navigation
   - Responsive design
   - Professional UI/UX
   - Real-time feedback

## API Integration

The frontend communicates with the backend via GraphQL queries:

```graphql
query GetAccounts {
  accounts(pagination: { skip: 0, take: 10 }) {
    id
    name
    orders {
      id
      totalPrice
      products { name quantity }
    }
  }
}

mutation CreateOrder($order: OrderInput!) {
  createOrder(order: $order) {
    id
    totalPrice
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### GraphQL Connection Error
- Ensure backend services are running
- Check `NEXT_PUBLIC_GRAPHQL_URL` in `.env.local`
- Verify GraphQL endpoint at `http://localhost:8000/query`

### CORS Issues
- Backend should be configured to accept requests from `http://localhost:3000`

### Port Conflicts
- If port 3000 is in use, run: `npm run dev -- -p 3001`

## Performance Tips

- The frontend implements efficient client-side caching
- Tailwind CSS is optimized for production builds
- Next.js provides automatic code splitting

## Future Enhancements

- Add user authentication
- Implement caching with Apollo Client
- Add real-time WebSocket updates
- Advanced search filters
- Order history and analytics

## License

MIT

---

**Happy Presenting!** 🎉

For the backend documentation, see the main project README.
