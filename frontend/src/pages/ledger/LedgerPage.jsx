import React, { useState } from 'react';
import Card from '../../components/Card.jsx';
import Table from '../../components/Table.jsx';
import Button from '../../components/Button';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  FileText,
  Package,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Printer,
  Eye,
  AlertCircle
} from 'lucide-react';

const LedgerPage = ({ data }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewModal, setViewModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Get unique values for filters
  const uniqueProducts = [...new Set(data.ledger.map(l => l.product))];
  const uniqueUsers = [...new Set(data.ledger.map(l => l.performedBy))];
  const transactionTypes = ["Receipt", "Delivery", "Transfer", "Adjustment"];

  // -----------------------------
  // FILTER + SEARCH LOGIC
  // -----------------------------
  const filtered = data.ledger.filter((entry) => {
    const matchSearch =
      entry.product.toLowerCase().includes(search.toLowerCase()) ||
      entry.reference.toLowerCase().includes(search.toLowerCase()) ||
      entry.from.toLowerCase().includes(search.toLowerCase()) ||
      entry.to.toLowerCase().includes(search.toLowerCase());
    
    const matchType = typeFilter === "all" ? true : entry.type === typeFilter;
    const matchProduct = productFilter === "all" ? true : entry.product === productFilter;
    const matchUser = userFilter === "all" ? true : entry.performedBy === userFilter;
    
    // Date range filter
    let matchDate = true;
    if (dateFrom || dateTo) {
      const entryDate = new Date(entry.date);
      if (dateFrom) matchDate = matchDate && entryDate >= new Date(dateFrom);
      if (dateTo) matchDate = matchDate && entryDate <= new Date(dateTo);
    }
    
    return matchSearch && matchType && matchProduct && matchUser && matchDate;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  // -----------------------------
  // STATISTICS
  // -----------------------------
  const stats = {
    totalMovements: data.ledger.length,
    stockIn: data.ledger.filter(l => l.quantity > 0).reduce((sum, l) => sum + l.quantity, 0),
    stockOut: data.ledger.filter(l => l.quantity < 0).reduce((sum, l) => sum + Math.abs(l.quantity), 0),
    receipts: data.ledger.filter(l => l.type === "Receipt").length,
    deliveries: data.ledger.filter(l => l.type === "Delivery").length,
    transfers: data.ledger.filter(l => l.type === "Transfer").length,
    adjustments: data.ledger.filter(l => l.type === "Adjustment").length
  };

  // -----------------------------
  // HANDLERS
  // -----------------------------
  const handleView = (entry) => {
    setSelectedEntry(entry);
    setViewModal(true);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Date", "Time", "Product", "Quantity", "Type", "From", "To", "Reference", "Performed By"],
      ...filtered.map(l => [l.date, l.time, l.product, l.quantity, l.type, l.from, l.to, l.reference, l.performedBy])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stock_ledger_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleExportExcel = () => {
    alert("Excel export functionality would be implemented here using a library like xlsx or exceljs");
    console.log("Exporting to Excel:", filtered);
  };

  const handlePrint = () => {
    window.print();
  };

  const clearAllFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setProductFilter("all");
    setUserFilter("all");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  // -----------------------------
  // TABLE COLUMNS
  // -----------------------------
  const columns = [
    { 
      key: 'date', 
      label: 'Date',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-500" />
          <span className="font-medium">{r.date}</span>
        </div>
      )
    },
    { 
      key: 'time', 
      label: 'Time',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-500" />
          <span className="text-gray-600">{r.time}</span>
        </div>
      )
    },
    { 
      key: 'product', 
      label: 'Product',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Package size={14} className="text-blue-500" />
          <span className="font-medium text-gray-800">{r.product}</span>
        </div>
      )
    },
    { 
      key: 'quantity', 
      label: 'Quantity', 
      render: (r) => (
        <div className="flex items-center gap-2">
          {r.quantity > 0 ? (
            <>
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-green-600 font-bold">+{r.quantity}</span>
            </>
          ) : (
            <>
              <TrendingDown size={16} className="text-red-500" />
              <span className="text-red-600 font-bold">{r.quantity}</span>
            </>
          )}
        </div>
      )
    },
    { 
      key: 'type', 
      label: 'Type',
      render: (r) => {
        const typeConfig = {
          Receipt: { bg: "bg-green-100", text: "text-green-700" },
          Delivery: { bg: "bg-blue-100", text: "text-blue-700" },
          Transfer: { bg: "bg-purple-100", text: "text-purple-700" },
          Adjustment: { bg: "bg-yellow-100", text: "text-yellow-700" }
        };
        const config = typeConfig[r.type] || { bg: "bg-gray-100", text: "text-gray-700" };
        
        return (
          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${config.bg} ${config.text}`}>
            {r.type}
          </span>
        );
      }
    },
    { key: 'from', label: 'From' },
    { key: 'to', label: 'To' },
    { 
      key: 'reference', 
      label: 'Reference',
      render: (r) => (
        <span className="font-mono text-sm text-blue-600">{r.reference}</span>
      )
    },
    { 
      key: 'performedBy', 
      label: 'Performed By',
      render: (r) => (
        <div className="flex items-center gap-2">
          <User size={14} className="text-gray-500" />
          <span className="text-gray-700">{r.performedBy}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <button
          onClick={() => handleView(r)}
          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
          title="View Details"
        >
          <Eye size={18} />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Stock Ledger</h2>
          <p className="text-gray-600 mt-1">Complete history of all inventory movements</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handlePrint}
            className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
          >
            <Printer size={18} />
            Print
          </Button>
          <Button 
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <FileSpreadsheet size={18} />
            Excel
          </Button>
          <Button 
            onClick={handleExportCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </Button>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Movements</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMovements}</p>
            </div>
            <FileText className="text-blue-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Stock In</p>
              <p className="text-2xl font-bold text-green-600">+{stats.stockIn}</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Stock Out</p>
              <p className="text-2xl font-bold text-red-600">-{stats.stockOut}</p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Net Change</p>
              <p className={`text-2xl font-bold ${stats.stockIn - stats.stockOut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.stockIn - stats.stockOut >= 0 ? '+' : ''}{stats.stockIn - stats.stockOut}
              </p>
            </div>
            <RefreshCw className="text-purple-500" size={32} />
          </div>
        </Card>
      </div>

      {/* TRANSACTION TYPE BREAKDOWN */}
      <Card title="📊 Transaction Breakdown">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Receipts</p>
            <p className="text-2xl font-bold text-green-700">{stats.receipts}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Deliveries</p>
            <p className="text-2xl font-bold text-blue-700">{stats.deliveries}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Transfers</p>
            <p className="text-2xl font-bold text-purple-700">{stats.transfers}</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Adjustments</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.adjustments}</p>
          </div>
        </div>
      </Card>

      {/* FILTERS SECTION */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-800">Advanced Filters</h3>
        </div>
        
        <div className="space-y-4">
          {/* Row 1: Search and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search product, reference, location..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Transaction Types</option>
              {transactionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Row 2: Product and User */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <option value="all">All Products</option>
              {uniqueProducts.map((product, idx) => (
                <option key={idx} value={product}>{product}</option>
              ))}
            </select>
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              {uniqueUsers.map((user, idx) => (
                <option key={idx} value={user}>{user}</option>
              ))}
            </select>
          </div>

          {/* Row 3: Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(search || typeFilter !== "all" || productFilter !== "all" || userFilter !== "all" || dateFrom || dateTo) && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 font-medium">Active Filters:</span>
            {search && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Search: "{search}"
                <button onClick={() => setSearch("")} className="hover:text-blue-900 font-bold">×</button>
              </span>
            )}
            {typeFilter !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Type: {typeFilter}
                <button onClick={() => setTypeFilter("all")} className="hover:text-blue-900 font-bold">×</button>
              </span>
            )}
            {productFilter !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Product: {productFilter}
                <button onClick={() => setProductFilter("all")} className="hover:text-blue-900 font-bold">×</button>
              </span>
            )}
            {userFilter !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                User: {userFilter}
                <button onClick={() => setUserFilter("all")} className="hover:text-blue-900 font-bold">×</button>
              </span>
            )}
            {(dateFrom || dateTo) && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Date: {dateFrom || '...'} to {dateTo || '...'}
                <button onClick={() => { setDateFrom(""); setDateTo(""); }} className="hover:text-blue-900 font-bold">×</button>
              </span>
            )}
            <button 
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </Card>

      {/* INFO CARD */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 mt-1" size={24} />
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About Stock Ledger</h4>
            <p className="text-sm text-gray-700 mb-3">
              The stock ledger is your complete audit trail, recording every inventory movement with full traceability. 
              This ensures transparency, accountability, and helps detect any discrepancies or unauthorized changes.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Green = Stock Increase (Receipt, Return)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Red = Stock Decrease (Delivery, Loss)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* TABLE SECTION */}
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Transaction History</h3>
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length}
            </span>
          </div>
        </div>
        
        <Table columns={columns} data={paginatedData} />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
                Previous
              </Button>
              
              {/* Page Numbers */}
              <div className="hidden md:flex gap-2">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  // Show first, last, current, and adjacent pages
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:opacity-50"
              >
                Next
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* VIEW DETAIL MODAL */}
      {viewModal && selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedEntry.quantity > 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {selectedEntry.quantity > 0 ? (
                    <TrendingUp className="text-green-600" size={24} />
                  ) : (
                    <TrendingDown className="text-red-600" size={24} />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Transaction Details</h2>
                  <p className="text-sm text-gray-600">{selectedEntry.reference}</p>
                </div>
              </div>
              <button
                onClick={() => setViewModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                  <p className="font-semibold text-gray-800">{selectedEntry.date} at {selectedEntry.time}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Transaction Type</p>
                  <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                    selectedEntry.type === "Receipt" ? "bg-green-100 text-green-700" :
                    selectedEntry.type === "Delivery" ? "bg-blue-100 text-blue-700" :
                    selectedEntry.type === "Transfer" ? "bg-purple-100 text-purple-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {selectedEntry.type}
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Product</p>
                  <p className="font-semibold text-gray-800">{selectedEntry.product}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Quantity Change</p>
                  <p className={`text-2xl font-bold ${selectedEntry.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedEntry.quantity > 0 ? '+' : ''}{selectedEntry.quantity}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">From</p>
                  <p className="font-semibold text-gray-800">{selectedEntry.from}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">To</p>
                  <p className="font-semibold text-gray-800">{selectedEntry.to}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Reference Number</p>
                  <p className="font-mono text-sm text-blue-600 font-semibold">{selectedEntry.reference}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Performed By</p>
                  <p className="font-semibold text-gray-800">{selectedEntry.performedBy}</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setViewModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LedgerPage;