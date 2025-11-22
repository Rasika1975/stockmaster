# StockMaster Backend API

This is the backend API for the StockMaster inventory management system, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, protected routes)
- Product management (CRUD operations)
- Warehouse management
- Category management
- Receipt management
- Delivery management
- Transfer management
- Adjustment management
- Ledger entries tracking

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd stockmaster/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on `.env.example` and configure your environment variables

5. Start the development server:
   ```
   npm run dev
   ```

### API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

Similar endpoints exist for warehouses, categories, receipts, deliveries, transfers, adjustments, and ledger entries.

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## License

This project is licensed under the MIT License.