import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  LayoutDashboard,
  Archive,
  ArrowDownLeft,
  Truck,
  ArrowRightLeft,
  Sliders,
  Book,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navLinks = [
  { icon: <LayoutDashboard size={20} />, name: 'Dashboard', path: '/dashboard' },
  { icon: <Archive size={20} />, name: 'Products', path: '/products' },
  { icon: <ArrowDownLeft size={20} />, name: 'Receipts', path: '/receipts' },
  { icon: <Truck size={20} />, name: 'Deliveries', path: '/deliveries' },
  { icon: <ArrowRightLeft size={20} />, name: 'Transfers', path: '/transfers' },
  { icon: <Sliders size={20} />, name: 'Adjustments', path: '/adjustments' },
  { icon: <Book size={20} />, name: 'Ledger', path: '/ledger' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    // No need to navigate here, the App component's logic will handle the redirect
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-gray-300 flex flex-col z-40 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'} lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 h-16">
          <span className={`font-bold text-2xl text-white ${!isOpen && 'hidden'}`}>StockMaster</span>
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700">
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navLinks.map(link => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 hover:text-white'
                }`}
              >
                {link.icon}
                <span className={`ml-4 font-medium ${!isOpen && 'hidden'}`}>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-3 border-t border-gray-700">
          <Link
            to="/profile"
            className={`flex items-center p-3 rounded-lg transition-colors ${
              location.pathname === '/profile' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            <User size={20} />
            <span className={`ml-4 font-medium ${!isOpen && 'hidden'}`}>{user?.name || 'Profile'}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 mt-2 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className={`ml-4 font-medium ${!isOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
