import React, { useState } from 'react';
import { Plus, Download, Filter, X, Save, AlertCircle } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const Table = ({ columns, data, onRowClick }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, idx) => {
          const diff = row.difference || (row.countedQty - row.systemQty);
          return (
            <tr 
              key={idx} 
              onClick={() => onRowClick && onRowClick(row)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 text-sm text-gray-900">{row.adjustmentNo}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{row.product}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{row.warehouse}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{row.systemQty}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{row.countedQty}</td>
              <td className={`px-4 py-3 text-sm font-semibold ${
                diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {diff > 0 ? '+' : ''}{diff}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{row.reason}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const AdjustmentsPage = ({ data: initialData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [adjustments, setAdjustments] = useState(initialData?.adjustments || [
    { adjustmentNo: 'ADJ-001', product: 'Laptop HP Pro', warehouse: 'Main WH', systemQty: 50, countedQty: 48, difference: -2, reason: 'Damaged' },
    { adjustmentNo: 'ADJ-002', product: 'Mouse Wireless', warehouse: 'Main WH', systemQty: 200, countedQty: 205, difference: 5, reason: 'Recount Found Extra' },
    { adjustmentNo: 'ADJ-003', product: 'Keyboard Mechanical', warehouse: 'Branch WH', systemQty: 30, countedQty: 28, difference: -2, reason: 'Lost/Missing' },
  ]);

  const [formData, setFormData] = useState({
    product: '',
    warehouse: '',
    systemQty: '',
    countedQty: '',
    reason: ''
  });

  const [filters, setFilters] = useState({
    warehouse: '',
    reason: '',
    dateFrom: '',
    dateTo: ''
  });

  const reasons = [
    'Damaged',
    'Lost/Missing',
    'Expired',
    'Theft',
    'Data Entry Error',
    'Recount Found Extra',
    'Supplier Shortage',
    'Return to Supplier',
    'Other'
  ];

  const warehouses = ['Main WH', 'Branch WH', 'Distribution Center', 'Retail Store'];

  const cols = [
    { key: 'adjustmentNo', label: 'Adjustment #' },
    { key: 'product', label: 'Product' },
    { key: 'warehouse', label: 'Warehouse' },
    { key: 'systemQty', label: 'System Qty' },
    { key: 'countedQty', label: 'Counted' },
    { key: 'difference', label: 'Diff' },
    { key: 'reason', label: 'Reason' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAdj = {
      adjustmentNo: `ADJ-${String(adjustments.length + 1).padStart(3, '0')}`,
      product: formData.product,
      warehouse: formData.warehouse,
      systemQty: parseInt(formData.systemQty),
      countedQty: parseInt(formData.countedQty),
      difference: parseInt(formData.countedQty) - parseInt(formData.systemQty),
      reason: formData.reason
    };
    setAdjustments([newAdj, ...adjustments]);
    setFormData({ product: '', warehouse: '', systemQty: '', countedQty: '', reason: '' });
    setShowAddForm(false);
  };

  const handleExport = () => {
    const csv = [
      cols.map(c => c.label).join(','),
      ...adjustments.map(a => 
        `${a.adjustmentNo},${a.product},${a.warehouse},${a.systemQty},${a.countedQty},${a.difference},${a.reason}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stock-adjustments.csv';
    link.click();
  };

  const filteredData = adjustments.filter(adj => {
    if (filters.warehouse && adj.warehouse !== filters.warehouse) return false;
    if (filters.reason && adj.reason !== filters.reason) return false;
    return true;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Stock Adjustments</h2>
            <p className="text-gray-600 mt-1">Track and manage inventory discrepancies</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} />
              Filters
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              Export
            </button>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              New Adjustment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Total Adjustments</div>
            <div className="text-2xl font-bold text-gray-900">{adjustments.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Items Decreased</div>
            <div className="text-2xl font-bold text-red-600">
              {adjustments.filter(a => a.difference < 0).length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Items Increased</div>
            <div className="text-2xl font-bold text-green-600">
              {adjustments.filter(a => a.difference > 0).length}
            </div>
          </Card>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button onClick={() => setFilters({ warehouse: '', reason: '', dateFrom: '', dateTo: '' })}>
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse</label>
                <select 
                  value={filters.warehouse}
                  onChange={(e) => setFilters({...filters, warehouse: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Warehouses</option>
                  {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <select 
                  value={filters.reason}
                  onChange={(e) => setFilters({...filters, reason: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Reasons</option>
                  {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">New Stock Adjustment</h3>
                <button onClick={() => setShowAddForm(false)}>
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex gap-3">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <strong>Important:</strong> Stock adjustments will immediately update inventory levels. Ensure counted quantities are accurate.
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input 
                      type="text"
                      required
                      value={formData.product}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse *</label>
                    <select 
                      required
                      value={formData.warehouse}
                      onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select warehouse</option>
                      {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">System Quantity *</label>
                    <input 
                      type="number"
                      required
                      value={formData.systemQty}
                      onChange={(e) => setFormData({...formData, systemQty: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Current system qty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Counted Quantity *</label>
                    <input 
                      type="number"
                      required
                      value={formData.countedQty}
                      onChange={(e) => setFormData({...formData, countedQty: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Physical count"
                    />
                  </div>
                </div>
                
                {formData.systemQty && formData.countedQty && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-700">Calculated Difference:</div>
                    <div className={`text-2xl font-bold ${
                      (formData.countedQty - formData.systemQty) > 0 ? 'text-green-600' : 
                      (formData.countedQty - formData.systemQty) < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {(formData.countedQty - formData.systemQty) > 0 ? '+' : ''}
                      {formData.countedQty - formData.systemQty} units
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                  <select 
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select reason</option>
                    {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save size={18} />
                    Save Adjustment
                  </button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Main Table */}
        <Card className="overflow-hidden">
          <Table columns={cols} data={filteredData} />
        </Card>
      </div>
    </div>
  );
};

export default AdjustmentsPage;