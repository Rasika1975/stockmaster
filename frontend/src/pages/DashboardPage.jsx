import React from 'react';
import { Archive, AlertTriangle, Truck, CheckSquare, ArrowRightLeft } from 'lucide-react';
import StatCard from './products/StatCard.jsx';
import Chart from './products/Chart.jsx';
import Card from '../components/Card.jsx';
import Table from '../components/Table.jsx';

const DashboardPage = ({ data }) => {
  // --- Dynamic KPI Calculations ---
  const totalProducts = data.products.length;
  const lowStockItems = data.products.filter(p => p.stock > 0 && p.stock <= p.reorderLevel).length;
  const pendingReceipts = data.receipts.filter(r => r.status === 'Pending').length;
  const pendingDeliveries = data.deliveries.filter(d => d.status === 'Pending').length;
  const pendingTransfers = data.transfers.filter(t => t.status === 'Pending').length;

  // --- Chart Data Preparation ---
  const stockByCategory = data.categories.map(category => {
    const totalStock = data.products
      .filter(p => p.category === category.name)
      .reduce((sum, p) => sum + p.stock, 0);
    return { name: category.name, value: totalStock };
  }).filter(c => c.value > 0);

  const recentActivity = data.ledger.slice(-5).map(entry => ({
    name: entry.product.substring(0, 15) + '...', // Shorten name for chart
    quantity: Math.abs(entry.quantity),
    type: entry.type,
  }));

  // --- Low Stock Table ---
  const lowStockProducts = data.products.filter(p => p.stock > 0 && p.stock <= p.reorderLevel);
  const lowStockColumns = [
    { key: 'name', label: 'Product' },
    { key: 'stock', label: 'Current Stock' },
    { key: 'reorderLevel', label: 'Reorder Level' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's a summary of your inventory.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard icon={<Archive />} title="Total Products" value={totalProducts} linkTo="/products" color="blue" />
        <StatCard icon={<AlertTriangle />} title="Low Stock Items" value={lowStockItems} linkTo="/products" color="yellow" />
        <StatCard icon={<CheckSquare />} title="Pending Receipts" value={pendingReceipts} linkTo="/receipts" color="purple" />
        <StatCard icon={<Truck />} title="Pending Deliveries" value={pendingDeliveries} linkTo="/deliveries" color="green" />
        <StatCard icon={<ArrowRightLeft />} title="Pending Transfers" value={pendingTransfers} linkTo="/transfers" color="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="pie"
          data={stockByCategory}
          dataKey="value"
          nameKey="name"
          title="Stock by Category"
        />
        <Chart
          type="bar"
          data={recentActivity}
          dataKey="quantity"
          nameKey="name"
          title="Recent Activity Volume"
        />
      </div>

      {/* Low Stock Items */}
      <div className="grid grid-cols-1">
        <Card title="Items to Reorder">
          <Table columns={lowStockColumns} data={lowStockProducts} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
