import React, { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Package
} from "lucide-react";

const ReceiptsPage = ({ data, onDeleteReceipt, onValidateReceipt }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [viewModal, setViewModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  // -----------------------------
  // FILTER + SEARCH LOGIC
  // -----------------------------
  const filtered = data.receipts.filter((r) => {
    const matchSearch =
      r.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      r.supplier.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ? true : r.status === statusFilter;
    const matchWarehouse =
      warehouseFilter === "all" ? true : r.warehouse === warehouseFilter;
    return matchSearch && matchStatus && matchWarehouse;
  });

  // -----------------------------
  // HANDLERS
  // -----------------------------
  const handleView = (receipt) => {
    setSelectedReceipt(receipt);
    setViewModal(true);
  };

  const handleEdit = (receipt) => {
    console.log("Edit receipt:", receipt);
    // Navigate to edit page or open edit modal
    // You can use: navigate(`/receipts/edit/${receipt.id}`)
  };

  const handleDelete = (receipt) => {
    setSelectedReceipt(receipt);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (onDeleteReceipt) onDeleteReceipt(selectedReceipt.id);
    setDeleteModal(false);
    setSelectedReceipt(null);
  };

  const handleValidate = (receipt) => {
    if (onValidateReceipt) onValidateReceipt(receipt);
  };

  const handleExport = () => {
    // Export filtered data as CSV
    const csvContent = [
      ["Receipt #", "Supplier", "Date", "Warehouse", "Status"],
      ...filtered.map(r => [r.receiptNo, r.supplier, r.date, r.warehouse, r.status])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // -----------------------------
  // STATISTICS
  // -----------------------------
  const stats = {
    total: data.receipts.length,
    received: data.receipts.filter(r => r.status === "Received").length,
    pending: data.receipts.filter(r => r.status === "Pending").length,
    cancelled: data.receipts.filter(r => r.status === "Cancelled").length
  };

  // -----------------------------
  // TABLE COLUMNS
  // -----------------------------
  const columns = [
    { 
      key: "receiptNo", 
      label: "Receipt #",
      render: (r) => (
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-blue-500" />
          <span className="font-semibold text-blue-600">{r.receiptNo}</span>
        </div>
      )
    },
    { key: "supplier", label: "Supplier" },
    { key: "date", label: "Date" },
    { 
      key: "warehouse", 
      label: "Warehouse",
      render: (r) => (
        <div className="flex items-center gap-2">
          <Package size={14} className="text-gray-500" />
          <span>{r.warehouse}</span>
        </div>
      )
    },
    {
      key: "items",
      label: "Items",
      render: (r) => (
        <span className="text-gray-600">{r.items?.length || 0} items</span>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (r) => {
        const statusConfig = {
          Received: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
          Pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
          Cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
          Draft: { bg: "bg-gray-100", text: "text-gray-700", icon: FileText }
        };
        const config = statusConfig[r.status] || statusConfig.Draft;
        const Icon = config.icon;
        
        return (
          <span className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 w-fit ${config.bg} ${config.text}`}>
            <Icon size={14} />
            {r.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(r)}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          {r.status !== "Received" && (
            <button
              onClick={() => handleEdit(r)}
              className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition"
              title="Edit Receipt"
            >
              <Edit2 size={18} />
            </button>
          )}
          {r.status === "Pending" && (
            <button
              onClick={() => handleValidate(r)}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition"
              title="Validate Receipt"
            >
              Validate
            </button>
          )}
          <button
            onClick={() => handleDelete(r)}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
            title="Delete Receipt"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Receipt Management</h2>
          <p className="text-gray-600 mt-1">Manage incoming stock receipts</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleExport}
            className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
          >
            <Download size={18} />
            Export
          </Button>
          <Link to="/receipts/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Plus size={18} />
              Add Receipt
            </Button>
          </Link>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Receipts</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <FileText className="text-blue-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Received</p>
              <p className="text-2xl font-bold text-gray-800">{stats.received}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <Clock className="text-yellow-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Cancelled</p>
              <p className="text-2xl font-bold text-gray-800">{stats.cancelled}</p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </Card>
      </div>

      {/* FILTER SECTION */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search receipt or supplier..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Status Filter */}
          <select
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Received">Received</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          {/* Warehouse Filter */}
          <select
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
          >
            <option value="all">All Warehouses</option>
            {data.warehouses.map((w) => (
              <option key={w.id} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Active Filters Display */}
        {(search || statusFilter !== "all" || warehouseFilter !== "all") && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active Filters:</span>
            {search && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Search: "{search}"
                <button onClick={() => setSearch("")} className="hover:text-blue-900">×</button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("all")} className="hover:text-blue-900">×</button>
              </span>
            )}
            {warehouseFilter !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Warehouse: {warehouseFilter}
                <button onClick={() => setWarehouseFilter("all")} className="hover:text-blue-900">×</button>
              </span>
            )}
            <button 
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setWarehouseFilter("all");
              }}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          </div>
        )}
      </Card>

      {/* TABLE SECTION */}
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Receipt List</h3>
          <span className="text-sm text-gray-600">
            Showing {filtered.length} of {data.receipts.length} receipts
          </span>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      {/* VIEW MODAL */}
      {viewModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold">Receipt Details</h2>
              <button
                onClick={() => setViewModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Receipt Number</p>
                  <p className="font-semibold text-gray-800">{selectedReceipt.receiptNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800">{selectedReceipt.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Supplier</p>
                  <p className="font-semibold text-gray-800">{selectedReceipt.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Warehouse</p>
                  <p className="font-semibold text-gray-800">{selectedReceipt.warehouse}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold
                    ${selectedReceipt.status === "Received" ? "bg-green-100 text-green-700" :
                      selectedReceipt.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-200 text-gray-700"}`}>
                    {selectedReceipt.status}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Items</h4>
                <div className="space-y-2">
                  {selectedReceipt.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.product}</span>
                      <span className="text-gray-600">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setViewModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Close
                </Button>
                {selectedReceipt.status === "Pending" && (
                  <Button
                    onClick={() => {
                      handleValidate(selectedReceipt);
                      setViewModal(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Validate Receipt
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Delete Receipt</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete receipt <strong>{selectedReceipt.receiptNo}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setDeleteModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptsPage;