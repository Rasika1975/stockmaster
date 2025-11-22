import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 space-y-4 fixed">
      <h2 className="text-2xl font-bold mb-6">IMS</h2>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block hover:text-blue-400">Dashboard</Link>
        <Link to="/products" className="block hover:text-blue-400">Products</Link>
        <Link to="/receipts" className="block hover:text-blue-400">Receipts</Link>
        <Link to="/delivery" className="block hover:text-blue-400">Delivery Orders</Link>
        <Link to="/transfers" className="block hover:text-blue-400">Internal Transfers</Link>
        <Link to="/adjustments" className="block hover:text-blue-400">Stock Adjustments</Link>
        <Link to="/history" className="block hover:text-blue-400">Move History</Link>
        <Link to="/settings" className="block hover:text-blue-400">Settings</Link>
      </nav>

      <div className="absolute bottom-5">
        <Link to="/profile" className="block hover:text-blue-400">My Profile</Link>
        <Link to="/" className="block hover:text-red-400 mt-2">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
