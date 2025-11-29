// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import 'aos/dist/aos.css'; // Correct import path for the CSS

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
// //     <nav className="bg-white shadow-sm">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16">
// //           <div className="flex items-center">
// //             <div className="flex-shrink-0 flex items-center">
// //               <i data-feather="trash-2" className="text-green-500 h-8 w-8"></i>
// //               <span className="ml-2 text-xl font-bold text-gray-800">Clean Campus</span>
// //             </div>
// //           </div>
// //           <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
// //             <NavLink to="/" className={({ isActive }) => `text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive ? 'text-gray-900 border-b-2 border-green-500' : ''}`}>Home</NavLink>
// //             <NavLink to="/report" className={({ isActive }) => `text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive ? 'text-gray-900 border-b-2 border-green-500' : ''}`}>Report Waste</NavLink>
// //             <NavLink to="/locate" className={({ isActive }) => `text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive ? 'text-gray-900 border-b-2 border-green-500' : ''}`}>Locate Dustbins</NavLink>
// //             <NavLink to="/admin-login" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Admin Login</NavLink>
// //           </div>
// //           <div className="-mr-2 flex items-center sm:hidden">
// //             <button
// //               type="button"
// //               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
// //               aria-controls="mobile-menu"
// //               aria-expanded={isMobileMenuOpen}
// //               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             >
// //               <i data-feather="menu"></i>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       <div className={`sm:hidden ${isMobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu">
// //         <div className="pt-2 pb-3 space-y-1">
// //           <NavLink to="/" className={({ isActive }) => `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-green-50 border-green-500 text-green-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>Home</NavLink>
// //           <NavLink to="/report" className={({ isActive }) => `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-green-50 border-green-500 text-green-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>Report Waste</NavLink>
// //           <NavLink to="/locate" className={({ isActive }) => `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-green-50 border-green-500 text-green-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>Locate Dustbins</NavLink>
// //           <NavLink to="/admin-login" className={({ isActive }) => `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-green-50 border-green-500 text-green-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>Admin Login</NavLink>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// {/* <Navbar/> */}
//   )

// // export default Navbar;