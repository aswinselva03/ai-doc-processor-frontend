import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/microsoft-logo.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Title on the right */}
        <Link to="/">
          <h1 className="text-xl font-semibold text-white">Review Assist</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;