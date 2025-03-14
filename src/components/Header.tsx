import React from "react";
import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  productCount?: number;
  onHomeClick?: () => void;
  onProductsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  productCount = 0,
  onHomeClick,
  onProductsClick
}) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0 mr-10">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </div>
          <nav className="hidden md:flex space-x-6 flex-1">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                e.preventDefault();
                if (onHomeClick) onHomeClick();
              }}
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                e.preventDefault();
                if (onProductsClick) onProductsClick();
              }}
            >
              Products
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {productCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {productCount}
                </span>
              )}
            </div>
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
