# Quick Start Guide

## Running the Complete Microservices Demo

### Step 1: Set Up Backend Services

Make sure all backend services are running first:

```bash
# From the root directory
docker-compose up -d --build
```

This starts:
- Account Service (Port 8080)
- Catalog Service (Port 8080)
- Order Service (Port 8080)
- GraphQL Gateway (Port 8000)
- PostgreSQL databases
- Elasticsearch

Wait ~30 seconds for all services to be ready.

### Step 2: Set Up Frontend

In a new terminal window:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Step 3: Demo the Application

#### 🏠 Home Page (/)
- View architecture overview
- See all services and technology stack
- Quick navigation to features

#### 👥 Accounts (/accounts)
1. Click "Create New Account"
2. Enter account name (e.g., "John Doe")
3. Click "Create"
4. View created account with zero orders

#### 📦 Products (/products)
1. Click "Add Product"
2. Enter product details:
   - Name: "Premium Laptop"
   - Description: "High-performance laptop"
   - Price: "1299.99"
3. Click "Create Product"
4. Search products to filter by name

#### 🛒 Orders (/orders)
1. Select an account from dropdown
2. Click "Add" on products to add to cart
3. Adjust quantities with +/- buttons
4. Review total price
5. Click "Create Order"
6. Go back to Accounts to see the order linked to the account

### Troubleshooting

**Frontend won't connect to backend:**
- Check that backend services are running: `docker ps`
- Verify GraphQL URL in `.env.local`: `http://localhost:8000/query`
- Wait 30 seconds for services to fully initialize

**Port already in use:**
```bash
# Use different port
npm run dev -- -p 3001
```

**Clear node_modules:**
```bash
rm -rf node_modules
npm install
```

**View backend logs:**
```bash
docker logs -f <service_name>
```

## Features to Demonstrate

### 1. Microservices Architecture
- Account Service handles user accounts
- Catalog Service manages products (Elasticsearch)
- Order Service processes orders

### 2. gRPC Communication
- Services communicate via gRPC protocol
- Fast, efficient inter-service communication

### 3. GraphQL Gateway
- Unified API endpoint
- Queries combine data from multiple services
- Single request, multiple service calls

### 4. Database Variety
- PostgreSQL for transactional data (Accounts, Orders)
- Elasticsearch for search (Catalog)

### 5. Scalability
- Each service can scale independently
- Load balance with Docker Compose
- Containerized approach

## Interview Talking Points

1. **Architecture Explanation**
   - "This demonstrates a microservices architecture where each service handles a specific domain"
   - "Services communicate via gRPC for efficiency"
   - "GraphQL acts as an API gateway that orchestrates requests"

2. **Technology Choices**
   - "We use Go for microservices because it's lightweight and concurrent"
   - "GraphQL provides a flexible, type-safe API"
   - "React/Next.js for modern, responsive frontend"

3. **Scalability**
   - "Each service can scale independently based on load"
   - "No monolithic bottleneck"
   - "Easy to add new services to the ecosystem"

4. **Code Quality**
   - "The frontend uses TypeScript for type safety"
   - "Clean component architecture"
   - "Error handling throughout the application"

## What to Show

✅ Create multiple accounts
✅ Create multiple products with different prices
✅ Create several orders with different combinations
✅ Search for products
✅ Show how orders link back to accounts with full order history

## Performance Tips

- Backend services take ~30 seconds to fully start
- First GraphQL request may take 2-3 seconds
- Subsequent requests are fast
- Frontend is optimized with code splitting

## Technical Details

- Frontend: React 18, Next.js 14, Tailwind CSS
- Backend: Go, gRPC, GraphQL
- Databases: PostgreSQL, Elasticsearch
- Containerization: Docker & Docker Compose

## Files Structure

```
frontend/
├── pages/            # Application routes
├── components/       # React components
├── lib/             # Utilities (GraphQL client)
├── styles/          # Global styles
├── public/          # Static assets
└── package.json     # Dependencies
```

---

**Ready to impress!** 🚀

For detailed information, see README.md in the frontend directory.
