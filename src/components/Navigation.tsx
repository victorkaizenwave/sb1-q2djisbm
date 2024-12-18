import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, FolderKanban, CheckSquare, LogOut } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isExecutiveView = location.pathname === '/';

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-bold text-xl text-gray-800 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                <div className="w-4 h-4 bg-white rounded-full transform translate-x-0.5"></div>
              </div>
              Kaizen Wave
            </Link>
            
            {isExecutiveView && (
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Users size={18} />
                  <span>Clients</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FolderKanban size={18} />
                  <span>Projects</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <CheckSquare size={18} />
                  <span>Tasks</span>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/client"
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Client View
            </Link>
            <Link
              to="/creator"
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Creator View
            </Link>
            <button
              onClick={() => navigate('/landing')}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <LogOut size={18} />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;