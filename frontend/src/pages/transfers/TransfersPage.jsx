import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Truck,
  Send
} from "lucide-react";

import Card from "../../components/Card.jsx";
import Table from "../../components/Table.jsx";
import Button from "../../components/Button.jsx";

const TransfersPage = ({ data }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromWarehouseFilter, setFromWarehouseFilter] = useState("all");
  const [toWarehouseFilter, setToWarehouseFilter] = useState("all");
  const [viewModal, setViewModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [transfers, setTransfers] = useState(data?.transfers || []);

  // -----------------------------
  // FILTER + SEARCH LOGIC
  // -----------------------------
  const filtered = transfers.filter((t) => {
    const matchSearch =
      (t.transferNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.fromWarehouse || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.toWarehouse || "").toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" ? true : t.status === statusFilter;
    const matchFrom = fromWarehouseFilter === "all" ? true : t.fromWarehouse === fromWarehouseFilter;
    const matchTo = toWarehouseFilter === "all" ? true : t.toWarehouse === toWarehouseFilter;

    return matchSearch && matchStatus && matchFrom && matchTo;
  });

  // -----------------------------
  // HANDLERS
  // -----------------------------
  const handleView = (transfer) => {
    setSelectedTransfer(transfer);
    setViewModal(true);
  };

  const handleEdit = (transfer) => {
    // placeholder for navigation to edit page or edit modal
    // e.g. navigate(`/transfers/edit/${transfer.id}`)
    console.log("Edit transfer:", transfer);
    alert("Edit flow not implemented in demo.");
  };

  const handleDelete = (transfer) => {
    setSelectedTransfer(transfer);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedTransfer) return;
    setTransfers((prev) => prev.filter((t) => t.id !== selectedTransfer.id));
    setDeleteModal(false);
    setSelectedTransfer(null);
  };

  const handleStartTransfer = (transfer) => {
    setTransfers((prev) => prev.map((t) =>
      t.id === transfer.id ? { ...t, status: "In Transit" } : t
    ));
  };

  const handleComplete = (transfer) => {
    // Here you would also update stock on backend.
    setTransfers((prev) => prev.map((t) =>
      t.id === transfer.id ? { ...t, status: "Completed" } : t
    ));
  };

  const handleExport = () => {
    // Export filtered data as CSV
    const csvRows = [
      ["Transfer #", "From", "To", "Date", "Status", "Reason"],
      ...filtered.map(t => [
        t.transferNo,
        t.fromWarehouse,
        t.toWarehouse,
        t.date,
        t.status,
        t.reason || "-"
      ])
    ];
    const csvContent = csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transfers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrintTransferNote = (transfer) => {
    // simple stub: you can open a printable window or generate PDF here
    const note = `Transfer Note: ${transfer.transferNo}\nFrom: ${transfer.fromWarehouse}\nTo: ${transfer.toWarehouse}\nDate: ${transfer.date}\nItems: ${transfer.items?.length || 0}`;
    console.log(note);
    alert(`Print transfer note for ${transfer.transferNo} (stub)`);
  };

  // -----------------------------
  // STATISTICS
  // -----------------------------
  const stats = {
    total: transfers.length,
    completed: transfers.filter(t => t.status === "Completed" || t.status === "Done").length,
    inTransit: transfers.filter(t => t.status === "In Transit").length,
    pending: transfers.filter(t => t.status === "Pending").length,
    cancelled: transfers.filter(t => t.status === "Cancelled").length
  };

  // Warehouse transfer flow stats
  const warehouseFlow = (data?.warehouses || []).map(wh => {
    const outgoing = transfers.filter(t => t.fromWarehouse === wh.name).length;
    const incoming = transfers.filter(t => t.toWarehouse === wh.name).length;
    return { name: wh.name, outgoing, incoming };
  });

  // -----------------------------
  // TABLE COLUMNS
  // -----------------------------
  const columns = [
    {
      key: "transferNo",
      label: "Transfer #",
      render: (t) => (
        <div className="flex items-center gap-2">
          <RefreshCw size={16} className="text-purple-500" />
          <span className="font-semibold text-purple-600">{t.transferNo}</span>
        </div>
      )
    },
    {
      key: "fromWarehouse",
      label: "From Warehouse",
      render: (t) => (
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-red-500" />
          <span className="text-gray-800">{t.fromWarehouse}</span>
        </div>
      )
    },
    {
      key: "arrow",
      label: "",
      render: () => (
        <div className="flex justify-center">
          <ArrowRight size={20} className="text-gray-400" />
        </div>
      )
    },
    {
      key: "toWarehouse",
      label: "To Warehouse",
      render: (t) => (
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-green-500" />
          <span className="text-gray-800">{t.toWarehouse}</span>
        </div>
      )
    },
    {
      key: "date",
      label: "Date",
      render: (t) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-500" />
          <span>{t.date}</span>
        </div>
      )
    },
    {
      key: "items",
      label: "Items",
      render: (t) => (
        <div className="flex items-center gap-2">
          <Package size={14} className="text-gray-500" />
          <span className="text-gray-600">{t.items?.length || 0} items</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (t) => {
        const statusConfig = {
          Completed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
          Done: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
          "In Transit": { bg: "bg-blue-100", text: "text-blue-700", icon: Truck },
          Pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
          Cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle }
        };
        const config = statusConfig[t.status] || statusConfig.Pending;
        const Icon = config.icon;
        return (
          <span className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 w-fit ${config.bg} ${config.text}`}>
            <Icon size={14} />
            {t.status}
          </span>
        );
      }
    },
    {
      key: "actions",
      label: "Actions",
      render: (t) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(t)}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          {t.status === "Pending" && (
            <>
              <button
                onClick={() => handleEdit(t)}
                className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition"
                title="Edit Transfer"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleStartTransfer(t)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
                title="Start Transfer"
              >
                <Send size={14} />
                Start
              </button>
            </>
          )}
          {t.status === "In Transit" && (
            <button
              onClick={() => handleComplete(t)}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
              title="Complete Transfer"
            >
              <CheckCircle size={14} />
              Complete
            </button>
          )}
          <button
            onClick={() => handlePrintTransferNote(t)}
            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition"
            title="Print Transfer Note"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={() => handleDelete(t)}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
            title="Delete Transfer"
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
          <h2 className="text-3xl font-bold text-gray-800">Internal Transfer Management</h2>
          <p className="text-gray-600 mt-1">Move inventory between warehouses within your organization</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExport}
            className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
          >
            <Download size={18} />
            Export
          </Button>
          <Link to="/transfers/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
              <Plus size={18} />
              Create Transfer
            </Button>
          </Link>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Transfers</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <RefreshCw className="text-purple-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </Card>
        <Card className="border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">In Transit</p>
              <p className="text-2xl font-bold text-gray-800">{stats.inTransit}</p>
            </div>
            <Truck className="text-blue-500" size={32} />
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

      {/* WAREHOUSE FLOW ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="📊 Warehouse Transfer Flow">
          <div className="space-y-4">
            {warehouseFlow.map((wh, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">{wh.name}</span>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-red-500" size={16} />
                      <span className="text-red-600 font-medium">{wh.outgoing} out</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-green-500 transform rotate-180" size={16} />
                      <span className="text-green-600 font-medium">{wh.incoming} in</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-2 bg-red-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${(wh.outgoing / Math.max(wh.outgoing + wh.incoming, 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(wh.incoming / Math.max(wh.outgoing + wh.incoming, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-purple-600 mt-1" size={24} />
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Transfer Workflow</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span className="text-gray-700"><strong>Pending:</strong> Transfer created, awaiting approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700"><strong>In Transit:</strong> Stock removed from source warehouse</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700"><strong>Completed:</strong> Stock added to destination warehouse</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600">💡</span>
                  <span><strong>Stock Update:</strong> When transfer is completed, stock decreases in source warehouse and increases in destination warehouse automatically.</span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* FILTER SECTION */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transfers..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Done">Done</option>
            <option value="In Transit">In Transit</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* From Warehouse Filter */}
          <select
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            value={fromWarehouseFilter}
            onChange={(e) => setFromWarehouseFilter(e.target.value)}
          >
            <option value="all">From: All Warehouses</option>
            {(data?.warehouses || []).map((w) => (
              <option key={w.id} value={w.name}>
                From: {w.name}
              </option>
            ))}
          </select>

          {/* To Warehouse Filter */}
          <select
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            value={toWarehouseFilter}
            onChange={(e) => setToWarehouseFilter(e.target.value)}
          >
            <option value="all">To: All Warehouses</option>
            {(data?.warehouses || []).map((w) => (
              <option key={w.id} value={w.name}>
                To: {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters Display */}
        {(search || statusFilter !== "all" || fromWarehouseFilter !== "all" || toWarehouseFilter !== "all") && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">Active Filters:</span>
            {search && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Search: "{search}"
                <button onClick={() => setSearch("")} className="hover:text-purple-900">×</button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("all")} className="hover:text-purple-900">×</button>
              </span>
            )}
            {fromWarehouseFilter !== "all" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                From: {fromWarehouseFilter}
                <button onClick={() => setFromWarehouseFilter("all")} className="hover:text-purple-900">×</button>
              </span>
            )}
            {toWarehouseFilter !== "all" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                To: {toWarehouseFilter}
                <button onClick={() => setToWarehouseFilter("all")} className="hover:text-purple-900">×</button>
              </span>
            )}
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setFromWarehouseFilter("all");
                setToWarehouseFilter("all");
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
          <h3 className="font-semibold text-gray-800">Transfer Orders</h3>
          <span className="text-sm text-gray-600">
            Showing {filtered.length} of {transfers.length} transfers
          </span>
        </div>
        <Table columns={columns} data={filtered} />
      </Card>

      {/* VIEW MODAL */}
      {viewModal && selectedTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="text-purple-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Transfer Details</h2>
                  <p className="text-sm text-gray-600">{selectedTransfer.transferNo}</p>
                </div>
              </div>
              <button
                onClick={() => { setViewModal(false); setSelectedTransfer(null); }}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Transfer Route Visual */}
              <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-red-50 via-gray-50 to-green-50 rounded-lg">
                <div className="text-center">
                  <MapPin className="mx-auto text-red-500 mb-2" size={32} />
                  <p className="font-bold text-gray-800">{selectedTransfer.fromWarehouse}</p>
                  <p className="text-xs text-gray-600">Source</p>
                </div>
                <ArrowRight className="text-gray-400" size={32} />
                <div className="text-center">
                  <MapPin className="mx-auto text-green-500 mb-2" size={32} />
                  <p className="font-bold text-gray-800">{selectedTransfer.toWarehouse}</p>
                  <p className="text-xs text-gray-600">Destination</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Transfer Number</p>
                  <p className="font-semibold text-gray-800">{selectedTransfer.transferNo}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-800">{selectedTransfer.date}</p>
                </div>
                <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold
                    ${selectedTransfer.status === "Completed" || selectedTransfer.status === "Done" ? "bg-green-100 text-green-700" :
                      selectedTransfer.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                      selectedTransfer.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-200 text-gray-700"}`}>
                    {selectedTransfer.status}
                  </span>
                </div>
                {selectedTransfer.reason && (
                  <div className="col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Reason for Transfer</p>
                    <p className="font-medium text-gray-800">{selectedTransfer.reason}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Package size={18} />
                  Items Being Transferred
                </h4>
                <div className="space-y-2">
                  {selectedTransfer.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="font-medium">{item.product}</span>
                      <span className="text-purple-600 font-semibold">Qty: {item.quantity}</span>
                    </div>
                  )) || <p className="text-sm text-gray-500">No items listed.</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => { setViewModal(false); setSelectedTransfer(null); }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handlePrintTransferNote(selectedTransfer)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  Print Note
                </Button>
                {selectedTransfer.status === "Pending" && (
                  <Button
                    onClick={() => { handleStartTransfer(selectedTransfer); setViewModal(false); setSelectedTransfer(null); }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Start Transfer
                  </Button>
                )}
                {selectedTransfer.status === "In Transit" && (
                  <Button
                    onClick={() => { handleComplete(selectedTransfer); setViewModal(false); setSelectedTransfer(null); }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && selectedTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Delete Transfer</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete transfer <strong>{selectedTransfer.transferNo}</strong>?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => { setDeleteModal(false); setSelectedTransfer(null); }}
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

export default TransfersPage;
