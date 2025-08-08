import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdHomeFilled } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import { IoMdLogOut } from 'react-icons/io';
import { LuDollarSign, LuMenu } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { FaRegUserCircle } from 'react-icons/fa';
import { Logout } from '../utilites/utilites';

const Layout = ({ children }) => {
  const  user= localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {};
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
   Logout()
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    {
      to: '/dashboard',
      icon: MdHomeFilled,
      label: 'Dashboard',
      active: isActive('/dashboard')
    },
    {
      to: '/transactions',
      icon: CiViewList,
      label: 'Transactions',
      active: isActive('/transactions')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <LuDollarSign  className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FinTrac</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{textDecoration:"none"}}
                    className={`flex  items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      link.active
                        ? 'bg-blue-100! text-blue-700!'
                        : 'text-gray-600! hover:text-gray-900@ hover:bg-gray-100!'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className=' '> {link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-gray-100 rounded-full">
                  <FaRegUserCircle className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <IoMdLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <RxCross2 className="w-6 h-6" />
                ) : (
                  <LuMenu  className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

      
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg ${
                        link.active
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile User Info */}
                <div className="px-4 py-3 border-t border-gray-200 mt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-1.5 bg-gray-100 rounded-full">
                      <FaRegUserCircle  className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-2 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <IoMdLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
