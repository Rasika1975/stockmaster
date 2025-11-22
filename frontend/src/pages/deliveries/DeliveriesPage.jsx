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
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  User,
  Calendar,
  MapPin,
  Send,
  PackageCheck,
  AlertCircle
} from "lucide-react";

const DeliveriesPage = ({ data }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [viewModal, setViewModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deliveries, setDeliveries] = useState(data.deliveries);

  // -----------------------------
  // FILTER + SEARCH LOGIC
  // -----------------------------
  const filtered = deliveries.filter((d) => {
    const matchSearch =
      d.deliveryNo.toLowerCase().includes(search.toLowerCase()) ||
      d.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ? true : d.status === statusFilter;
    const matchWarehouse =
      warehouseFilter === "all" ? true : d.warehouse === warehouseFilter;
    return matchSearch && matchStatus && matchWarehouse;
  });

  // -----------------------------
  // HANDLERS
  // -----------------------------
  const handleView = (delivery) => {
    setSelectedDelivery(delivery);
    setViewModal(true);
  };

  const handleEdit = (delivery) => {
    console.log("Edit delivery:", delivery);
    // Navigate to edit page or open edit modal
    // You can use: navigate(`/deliveries/edit/${delivery.id}`)
  };

  const handleDelete = (delivery) => {
    setSelectedDelivery(delivery);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setDeliveries(deliveries.filter(d => d.id !== selectedDelivery.id));
    setDeleteModal(false);
    setSelectedDelivery(null);
  };

  const handleDispatch = (delivery) => {
    // Update delivery status to "Dispatched"
    setDeliveries(deliveries.map(d => 
      d.id === delivery.id ? { ...d, status: "Dispatched" } : d
    ));
  };

  const handleComplete = (delivery) => {
    // Update delivery status to "Delivered"
    setDeliveries(deliveries.map(d => 
      d.id === delivery.id ? { ...d, status: "Delivered" } : d
    ));
  };

  const handleExport = () => {
    // Export filtered data as CSV
    const csvContent = [
      ["Delivery #", "Customer", "Date", "Warehouse", "Status"],
      ...filtered.map(d => [d.deliveryNo, d.customer, d.date, d.warehouse, d.status])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deliveries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handlePrintPackingSlip = (delivery) => {
    // Generate and print packing slip
    console.log("Print packing slip for:", delivery.deliveryNo);
    // In real app, this would open a printable document
    alert(`Printing packing slip for ${delivery.deliveryNo}`);
  };

  // -----------------------------
  // STATISTICS
  // -----------------------------
  const stats = {
    total: deliveries.length,
    delivered: deliveries.filter(d => d.status === "Delivered" || d.status === "Done").length,
    pending: deliveries.filter(d => d.status === "Pending" || d.status === "Draft").length,
    dispatched: deliveries.filter(d => d.status === "Dispatched").length,
    cancelled: deliveries.filter(d => d.status === "Cancelled").length
  };

  // -----------------------------
  // TABLE COLUMNS
  // -----------------------------
  const columns = [
    { 
      key: "deliveryNo", 
      label: "Delivery #",
      render: (d) => (
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-blue-500" />
          <span className="font-semibold text-blue-600">{d.deliveryNo}</span>
        </div>
      )
    },
    { 
      key: "customer", 
      label: "Customer",
      render: (d) => (
        <div className="flex items-center gap-2">
          <User size={14} className="text-gray-500" />
          <span>{d.customer}</span>
        </div>
      )
    },
    { 
      key: "date", 
      label: "Date",
      render: (d) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-500" />
          <span>{d.date}</span>
        </div>
      )
    },
    { 
      key: "warehouse", 
      label: "Warehouse",
      render: (d) => (
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-gray-500" />
          <span>{d.warehouse}</span>
        </div>
      )
    },
    {
      key: "items",
      label: "Items",
      render: (d) => (
        <div className="flex items-center gap-2">
          <Package size={14} className="text-gray-500" />
          <span className="text-gray-600">{d.items?.length || 0} items</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (d) => {
        const statusConfig = {
          Delivered: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
          Done: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
          Dispatched: { bg: "bg-blue-100", text: "text-blue-700", icon: Send },
          Pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
          Draft: { bg: "bg-gray-100", text: "text-gray-700", icon: AlertCircle },
          Cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle }
        };
        const config = statusConfig[d.status] || statusConfig.Draft;
        const Icon = config.icon;
        
        return (
          <span className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 w-fit ${config.bg} ${config.text}`}>
            <Icon size={14} />
            {d.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (d) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(d)}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          {(d.status === "Draft" || d.status === "Pending") && (
            <button
              onClick={() => handleEdit(d)}
              className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition"
              title="Edit Delivery"
            >
              <Edit2 size={18} />
            </button>
          )}
          {d.status === "Pending" && (
            <button
              onClick={() => handleDispatch(d)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
              title="Dispatch Order"
            >
              <Send size={14} />
              Dispatch
            </button>
          )}
          {d.status === "Dispatched" && (
            <button
              onClick={() => handleComplete(d)}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
              title="Mark as Delivered"
            >
              <CheckCircle size={14} />
              Complete
            </button>
          )}
          <button
            onClick={() => handlePrintPackingSlip(d)}
            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition"
            title="Print Packing Slip"
          >
            <PackageCheck size={18} />
          </button>
          <button
            onClick={() => handleDelete(d)}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
            title="Delete Delivery"
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
          <h2 className="text-3xl font-bold text-gray-800">Delivery Management</h2>
          <p className="text-gray-600 mt-1">Manage outgoing stock deliveries & customer orders</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleExport}
            className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
          >
            <Download size={18} />
            Export
          </Button>
          <Link to="/deliveries/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Plus size={18} />
              Create Delivery
            </Button>
          </Link>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Deliveries</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <Truck className="text-blue-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Delivered</p>
              <p className="text-2xl font-bold text-gray-800">{stats.delivered}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-blue-400">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Dispatched</p>
              <p className="text-2xl font-bold text-gray-800">{stats.dispatched}</p>
            </div>
            <Send className="text-blue-400" size={32} />
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
              placeholder="Search delivery or customer..."
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
            <option value="Delivered">Delivered</option>
            <option value="Done">Done</option>
            <option value="Dispatched">Dispatched</option>
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

      {/* DELIVERY STATUS WORKFLOW INFO */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 mt-1" size={24} />
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Delivery Workflow</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="text-gray-700">Draft → Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-700">Pending → Dispatched</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700">Dispatched → Delivered</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              💡 Stock is deducted when delivery is marked as Dispatched
            </p>
          </div>
        </div>
      </Card>

      {/* TABLE SECTION */}
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Delivery Orders</h3>
          <span className="text-sm text-gray-600">
            Showing {filtered.length} of {deliveries.length} deliveries
          </span>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      {/* VIEW MODAL */}
      {viewModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Delivery Details</h2>
                  <p className="text-sm text-gray-600">{selectedDelivery.deliveryNo}</p>
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
                  <p className="text-sm text-gray-500 mb-1">Delivery Number</p>
                  <p className="font-semibold text-gray-800">{selectedDelivery.deliveryNo}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-800">{selectedDelivery.date}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-gray-800">{selectedDelivery.customer}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Warehouse</p>
                  <p className="font-semibold text-gray-800">{selectedDelivery.warehouse}</p>
                </div>
                <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold
                    ${selectedDelivery.status === "Delivered" || selectedDelivery.status === "Done" ? "bg-green-100 text-green-700" :
                      selectedDelivery.status === "Dispatched" ? "bg-blue-100 text-blue-700" :
                      selectedDelivery.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-200 text-gray-700"}`}>
                    {selectedDelivery.status}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Package size={18} />
                  Items to Deliver
                </h4>
                <div className="space-y-2">
                  {selectedDelivery.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="font-medium">{item.product}</span>
                      <span className="text-blue-600 font-semibold">Qty: {item.quantity}</span>
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
                <Button
                  onClick={() => handlePrintPackingSlip(selectedDelivery)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
                >
                  <PackageCheck size={18} />
                  Print Slip
                </Button>
                {selectedDelivery.status === "Pending" && (
                  <Button
                    onClick={() => {
                      handleDispatch(selectedDelivery);
                      setViewModal(false);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Dispatch
                  </Button>
                )}
                {selectedDelivery.status === "Dispatched" && (
                  <Button
                    onClick={() => {
                      handleComplete(selectedDelivery);
                      setViewModal(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Mark Delivered
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Delete Delivery</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete delivery <strong>{selectedDelivery.deliveryNo}</strong>? 
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

export default DeliveriesPage;