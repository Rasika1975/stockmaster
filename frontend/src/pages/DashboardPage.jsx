import React from 'react';
import { Archive, AlertTriangle, Truck, CheckSquare, ArrowRightLeft, TrendingUp, TrendingDown, MoreHorizontal, Settings, ArrowUpRight, ArrowDownRight, Download, Calendar, Filter, RefreshCw, Share2 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const mockData = {
  products: Array(150).fill(0).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    stock: Math.floor(Math.random() * 100),
    reorderLevel: 20,
    category: ['Electronics', 'Furniture', 'Clothing', 'Food', 'Books'][Math.floor(Math.random() * 5)]
  })),
  receipts: Array(10).fill(0).map((_, i) => ({ id: i, status: i % 3 === 0 ? 'Pending' : 'Completed' })),
  deliveries: Array(8).fill(0).map((_, i) => ({ id: i, status: i % 4 === 0 ? 'Pending' : 'Completed' })),
  transfers: Array(5).fill(0).map((_, i) => ({ id: i, status: i % 2 === 0 ? 'Pending' : 'Completed' })),
  categories: [
    { name: 'Electronics' },
    { name: 'Furniture' },
    { name: 'Clothing' },
    { name: 'Food' },
    { name: 'Books' }
  ],
  ledger: Array(20).fill(0).map((_, i) => ({
    product: `Product Item ${i + 1}`,
    quantity: Math.floor(Math.random() * 50) * (Math.random() > 0.5 ? 1 : -1),
    type: ['Receipt', 'Delivery', 'Transfer'][Math.floor(Math.random() * 3)]
  }))
};

// StatCard Component - Light Theme
const StatCard = ({ icon, title, value, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    yellow: 'bg-amber-50 text-amber-600 border-amber-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer group hover:border-gray-300">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg border ${colorClasses[color]} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
      </div>
    </div>
  );
};

// Dropdown Menu - Light Theme
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 z-20">
            <div className="py-1">
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Download className="w-4 h-4" /> Export Data
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Calendar className="w-4 h-4" /> Change Period
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Filter className="w-4 h-4" /> Filter Data
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <div className="border-t border-gray-100 my-1" />
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Share2 className="w-4 h-4" /> Share Report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Stock by Category - Light Theme Pie Chart
const StockByCategoryChart = ({ data }) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg min-w-[150px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
            <span className="text-xs font-medium text-gray-500">{payload[0].name}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">{payload[0].value.toLocaleString()} units</div>
          <div className="text-xs text-gray-400 mt-1">
            {((payload[0].value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}% of total
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Stock by Category</h3>
          <div className="flex items-center gap-4">
            {data.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-gray-500 text-sm">{item.name}</span>
              </div>
            ))}
            <DropdownMenu />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderLabel}
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="value"
                  strokeWidth={4}
                  stroke="#ffffff"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-52 space-y-3">
            <div className="text-center mb-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-gray-900">{total.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Units</div>
            </div>
            {data.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Recent Activity Volume - Light Theme Bar Chart
const RecentActivityChart = ({ data }) => {
  const [period, setPeriod] = React.useState('week');
  
  const activityData = {
    week: data.slice(-7).map((item, i) => ({ ...item, name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7] })),
    month: data.slice(-12).map((item, i) => ({ ...item, name: `W${i + 1}` })),
    year: data.slice(-6).map((item, i) => ({ ...item, name: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'][i % 6] }))
  };

  const currentData = activityData[period];
  const totalVolume = currentData.reduce((sum, item) => sum + item.quantity, 0);
  const avgVolume = Math.round(totalVolume / currentData.length);
  const maxVolume = Math.max(...currentData.map(d => d.quantity));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg min-w-[140px]">
          <div className="text-xs font-medium text-gray-500 mb-2">{label}</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-lg font-semibold text-gray-900">{payload[0].value} units</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity Volume</h3>
          <button className="p-2 hover:bg-white/80 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="px-6 pb-6 pt-6 space-y-6">
        {/* Period Toggle */}
        <div className="rounded-xl border border-gray-200 p-1.5 flex gap-1 bg-white/80">
          {['week', 'month', 'year'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`h-10 px-4 rounded-lg flex-1 text-sm font-medium transition-all ${
                period === p
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="relative bg-white/60 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={currentData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
              <defs>
                <linearGradient id="barGradientLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" opacity={0.8} vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                tickMargin={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }} />
              <Bar 
                dataKey="quantity" 
                fill="url(#barGradientLight)" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between pt-2 px-2">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-sm text-gray-500">Total Volume</div>
            <div className="flex items-start gap-2 mt-1">
              <span className="text-3xl font-bold text-gray-900">{totalVolume}</span>
              <span className="text-sm text-blue-600 font-medium pt-1 bg-blue-50 px-2 py-0.5 rounded-full">
                avg {avgVolume}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-right">
            <div className="text-sm text-gray-500">Peak Activity</div>
            <div className="flex items-center justify-end gap-1.5 text-emerald-600 mt-1">
              <ArrowUpRight className="w-5 h-5" />
              <span className="text-3xl font-bold">{maxVolume}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = ({ data = mockData }) => {
  const totalProducts = data.products.length;
  const lowStockItems = data.products.filter(p => p.stock > 0 && p.stock <= p.reorderLevel).length;
  const pendingReceipts = data.receipts.filter(r => r.status === 'Pending').length;
  const pendingDeliveries = data.deliveries.filter(d => d.status === 'Pending').length;
  const pendingTransfers = data.transfers.filter(t => t.status === 'Pending').length;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const stockByCategory = data.categories.map((category, index) => {
    const totalStock = data.products
      .filter(p => p.category === category.name)
      .reduce((sum, p) => sum + p.stock, 0);
    return {
      name: category.name,
      value: totalStock,
      color: COLORS[index % COLORS.length]
    };
  }).filter(c => c.value > 0);

  const recentActivity = data.ledger.slice(-12).map((entry, i) => ({
    name: `Item ${i + 1}`,
    quantity: Math.abs(entry.quantity),
  }));

  const lowStockProducts = data.products.filter(p => p.stock > 0 && p.stock <= p.reorderLevel).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's your inventory overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium transition-all shadow-sm">
              Today
            </button>
            <button className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-500 transition-all shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard icon={<Archive className="w-5 h-5" />} title="Total Products" value={totalProducts} trend={12} color="blue" />
          <StatCard icon={<AlertTriangle className="w-5 h-5" />} title="Low Stock Items" value={lowStockItems} trend={-5} color="yellow" />
          <StatCard icon={<CheckSquare className="w-5 h-5" />} title="Pending Receipts" value={pendingReceipts} trend={8} color="purple" />
          <StatCard icon={<Truck className="w-5 h-5" />} title="Pending Deliveries" value={pendingDeliveries} trend={3} color="green" />
          <StatCard icon={<ArrowRightLeft className="w-5 h-5" />} title="Pending Transfers" value={pendingTransfers} trend={-2} color="red" />
        </div>

        {/* Stock by Category - Full Width */}
        <StockByCategoryChart data={stockByCategory} />

        {/* Recent Activity Volume - Full Width */}
        <RecentActivityChart data={recentActivity} />

        {/* Low Stock Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="text-base font-semibold text-gray-900">Items to Reorder</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reorder Level</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{product.stock}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{product.reorderLevel}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          Low Stock
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;