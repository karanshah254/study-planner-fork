import { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bell className="h-5 w-5" />
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>

          {isOpen && (
            <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-4 w-48 z-10">
              <h2 className="text-lg text-gray-700 dark:text-gray-300 font-semibold mb-2">Notifications</h2>
              <ul>
                <li className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  New study material added!
                </li>
                <li className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Course update: Assignment due tomorrow.
                </li>
                <li className="text-sm text-gray-700 dark:text-gray-300">
                  Reminder: Webinar starts in 1 hour.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;