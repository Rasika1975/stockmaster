import { Link } from 'react-router-dom';

const StatCard = ({ icon, title, value, linkTo, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <Link to={linkTo} className="block p-6 bg-white shadow-sm rounded-xl hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>{icon}</div>
      <p className="text-sm text-gray-500 mt-3">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </Link>
  );
};

export default StatCard;