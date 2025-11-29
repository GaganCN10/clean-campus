import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MapPinIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const location = useLocation();

  // ✨ UPDATED: Added water filters nav item
  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/report-waste', label: 'Report Waste', icon: TrashIcon },
    { path: '/locate-dustbins', label: 'Find Dustbins', icon: MapPinIcon },
    { path: '/locate-water-filters', label: 'Water Filters', icon: '💧', isEmoji: true },
    { path: '/admin', label: 'Admin', icon: UserCircleIcon }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌱</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EcoClean Campus</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            {navItems.map(({ path, label, icon: Icon, isEmoji }) => (
              <Link
                key={path}
                to={path}
                onClick={(e) => {
                  if (path === "/") {
                    if (location.pathname === "/" && window.scrollY === 0) {
                      e.preventDefault();
                      window.scrollBy({ top: 50, behavior: "smooth" });
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 300);
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                {isEmoji ? (
                  <span className="text-lg">{Icon}</span>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <div className="flex space-x-2">
              {navItems.map(({ path, icon: Icon, isEmoji }) => (
                <Link
                  key={path}
                  to={path}
                  className={`p-2 rounded-md ${
                    location.pathname === path
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  {isEmoji ? (
                    <span className="text-xl">{Icon}</span>
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
