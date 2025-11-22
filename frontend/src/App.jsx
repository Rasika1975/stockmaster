import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { dummyData } from './data/dummyData.js';
import { useAuth } from './context/AuthContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/products/ProductPage.jsx';
import ProductCreate from './pages/products/ProductCreate.jsx';
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
    <div className="lg:pl-64">
      <Navbar onMenuClick={() => setIsOpen(prev => !prev)} />
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const App = () => {
  const { isAuthenticated } = useAuth();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={
          <AppLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <DashboardPage data={dummyData} />
          </AppLayout>
        } />
        <Route path="/products" element={
          <AppLayout activeMenu={'products'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <ProductsPage data={dummyData} />
          </AppLayout>
        } />
        <Route path="/products/create" element={
          <AppLayout activeMenu={'products'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <ProductCreate />
          </AppLayout>
        } />
        <Route path="/products/:id" element={
          <AppLayout activeMenu={'products'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <ProductDetail data={dummyData} />
          </AppLayout>
        } />
        <Route path="/receipts" element={
          <AppLayout activeMenu={'receipts'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <ReceiptsPage data={dummyData} />
          </AppLayout>
        } />
        <Route path="/deliveries" element={
          <AppLayout activeMenu={'deliveries'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <DeliveriesPage data={dummyData} />
          </AppLayout>
        } />
        <Route path="/transfers" element={
          <AppLayout activeMenu={'transfers'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <TransfersPage data={dummyData} />
          </AppLayout>
        } />
        <Route path="/adjustments" element={
          <AppLayout activeMenu={'adjustments'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <AdjustmentsPage data={dummyData} />
          </AppLayout>
        } />
        <Route path="/ledger" element={
          <AppLayout activeMenu={'ledger'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <LedgerPage data={dummyData} />
          </AppLayout>
        } />
        <Route path="/profile" element={
          <AppLayout activeMenu={'profile'} setActiveMenu={setActiveMenu} isOpen={isOpen} setIsOpen={setIsOpen}>
            <ProfilePage />
          </AppLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
