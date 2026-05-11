import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MapPinIcon, TrashIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✨ UPDATED: Added water filters nav item
  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/report-waste', label: 'Report Waste', icon: TrashIcon },
    { path: '/locate-dustbins', label: 'Find Dustbins', icon: MapPinIcon },
    { path: '/locate-water-filters', label: 'Water Filters', icon: '💧', isEmoji: true },
    { path: '/locate-food-courts', label: 'Food Courts', icon: '🍔', isEmoji: true },
    { path: '/locate-restrooms', label: 'Restrooms', icon: '🚻', isEmoji: true },
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
                <span className="hidden lg:inline">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none p-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(({ path, label, icon: Icon, isEmoji }) => (
              <Link
                key={path}
                to={path}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
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
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {isEmoji ? (
                  <span className="text-xl w-6 text-center">{Icon}</span>
                ) : (
                  <Icon className="w-6 h-6" />
                )}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
