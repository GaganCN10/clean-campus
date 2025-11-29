import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-12" style={{ borderRadius: '3rem', border: '2px solid #fff', background: '#2d3748' }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8" >
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Clean Campus</h3>
          <p className="text-sm">
            Empowering our community to maintain a clean and sustainable environment.
          </p>
          {/* <div className="flex mt-4 space-x-4" >
            <a href="/" className="text-gray-400 hover:text-white transition duration-300">
              <i data-feather="facebook" className="h-5 w-5"></i>
            </a>
            <a href="/report-waste" className="text-gray-400 hover:text-white transition duration-300">
              <i data-feather="twitter" className="h-5 w-5"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <i data-feather="instagram" className="h-5 w-5"></i>
            </a>
          </div> */}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition duration-300">Home</NavLink></li>
            <li><NavLink to="/report-waste" className="hover:text-white transition duration-300">Report Waste</NavLink></li>
            <li><NavLink to="/locate-dustbins" className="hover:text-white transition duration-300">Locate Dustbins</NavLink></li>
            <li><NavLink to="/admin" className="hover:text-white transition duration-300">Admin Login</NavLink></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">
            123 Campus Lane, University City, 12345<br />
            Email: <a href="mailto:info@cleancampus.edu" className="hover:text-white transition duration-300">info@cleancampus.edu</a><br />
            Phone: (123) 456-7890
          </p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
        © 2024 Clean Campus. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;