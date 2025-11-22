# StockMaster Frontend

This is the frontend application for the StockMaster inventory management system, built with React and Vite.

## Features

- User authentication (login/logout)
- Product management (create, view, update, delete)
- Receipt management (create, validate, delete)
- Dashboard with key metrics
- Responsive design for all device sizes

## Technologies Used

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Lucide React Icons

## API Integration

The frontend is connected to a Node.js backend API running on `http://localhost:5000`.

### Services

All API calls are handled through the service layer in `src/services/api.js`:

- Authentication API (`authAPI`)
- Products API (`productsAPI`)
- Warehouses API (`warehousesAPI`)
- Categories API (`categoriesAPI`)
- Receipts API (`receiptsAPI`)
- Deliveries API (`deliveriesAPI`)
- Transfers API (`transfersAPI`)
- Adjustments API (`adjustmentsAPI`)
- Ledger API (`ledgerAPI`)

### Authentication

- JWT token-based authentication
- Token stored in localStorage
- Protected routes for authenticated users only

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── data/           # Static data and dummy data
├── pages/          # Page components
├── services/       # API service layer
├── utils/          # Utility functions
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## Environment Variables

The application expects the backend API to be running on `http://localhost:5000`.

## License

This project is licensed under the MIT License.
