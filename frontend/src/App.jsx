import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { dummyData } from './data/dummyData.js';
import { useAuth } from './context/AuthContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/products/ProductPage.jsx';
import ProductCreate from './pages/products/ProductCreate.jsx';
import ReceiptCreate from './pages/receipts/ReceiptCreate.jsx';
import ProductDetail from './pages/products/ProductDetail.jsx';
import ReceiptsPage from './pages/receipts/ReceiptsPage.jsx';
import DeliveriesPage from './pages/deliveries/DeliveriesPage.jsx';
import TransfersPage from './pages/transfers/TransfersPage.jsx';
import AdjustmentsPage from './pages/adjustments/AdjustmentsPage.jsx';
import LedgerPage from './pages/ledger/LedgerPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';

const AppLayout = ({ children, activeMenu, setActiveMenu, isOpen, setIsOpen }) => (
  <div className="min-h-screen bg-gray-50">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
      <Navbar onMenuClick={() => setIsOpen(prev => !prev)} />
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const App = () => {
  const { isAuthenticated } = useAuth();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const [appData, setAppData] = useState(dummyData);

  const handleAddProduct = (newProduct) => {
    setAppData(prevData => ({
      ...prevData,
      products: [...prevData.products, newProduct],
      ledger: [...prevData.ledger, { id: Date.now(), date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), product: newProduct.name, quantity: newProduct.initialStock, type: 'Adjustment', from: '-', to: 'Main Warehouse', reference: 'Initial Stock', performedBy: 'Admin' }]
    }));
    alert(`Product "${newProduct.name}" has been successfully added!`);
  };

  const handleAddReceipt = (newReceipt) => {
    setAppData(prevData => ({
      ...prevData,
      receipts: [...prevData.receipts, newReceipt]
    }));
    alert(`Receipt "${newReceipt.receiptNo}" has been successfully created!`);
  };

  const handleDeleteReceipt = (receiptId) => {
    setAppData(prevData => ({
      ...prevData,
      receipts: prevData.receipts.filter(r => r.id !== receiptId)
    }));
  };

  const handleValidateReceipt = (validatedReceipt) => {
    setAppData(prevData => {
      const updatedReceipts = prevData.receipts.map(r =>
        r.id === validatedReceipt.id ? { ...r, status: "Received" } : r
      );

      const productsToUpdate = new Map(prevData.products.map(p => [p.name, { ...p }]));
      const newLedgerEntries = [];

      validatedReceipt.items.forEach(item => {
        if (productsToUpdate.has(item.product)) {
          const product = productsToUpdate.get(item.product);
          product.stock += item.quantity;
          newLedgerEntries.push({ id: Date.now() + Math.random(), date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), product: item.product, quantity: item.quantity, type: 'Receipt', from: validatedReceipt.supplier, to: validatedReceipt.warehouse, reference: validatedReceipt.receiptNo, performedBy: 'Admin' });
        }
      });

      return {
        ...prevData,
        receipts: updatedReceipts,
        products: Array.from(productsToUpdate.values()),
        ledger: [...prevData.ledger, ...newLedgerEntries],
      };
    });
    alert(`Receipt "${validatedReceipt.receiptNo}" has been validated and stock levels updated!`);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><DashboardPage data={appData} /></AppLayout></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><ProductsPage data={appData} onAddProduct={handleAddProduct} /></AppLayout></ProtectedRoute>} />
        <Route path="/products/create" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><ProductCreate onProductCreated={handleAddProduct} data={appData} /></AppLayout></ProtectedRoute>} />
        <Route path="/receipts/create" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><ReceiptCreate onAddReceipt={handleAddReceipt} data={appData} /></AppLayout></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><ProductDetail /></AppLayout></ProtectedRoute>} />
        <Route path="/receipts" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><ReceiptsPage data={appData} onDeleteReceipt={handleDeleteReceipt} onValidateReceipt={handleValidateReceipt} /></AppLayout></ProtectedRoute>} />
        <Route path="/deliveries" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><DeliveriesPage data={appData} /></AppLayout></ProtectedRoute>} />
        <Route path="/transfers" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><TransfersPage data={appData} /></AppLayout></ProtectedRoute>} />
        <Route path="/adjustments" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><AdjustmentsPage data={appData} /></AppLayout></ProtectedRoute>} />
        <Route path="/ledger" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><LedgerPage data={appData} /></AppLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><AppLayout isOpen={isOpen} setIsOpen={setIsOpen}><ProfilePage /></AppLayout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
