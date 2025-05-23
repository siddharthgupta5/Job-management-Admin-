
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onCreateJobClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateJobClick }) => {
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="text-gray-600 hover:text-gray-900">
                Find Jobs
              </Link>
            </li>
            <li>
              <Link to="/talents" className="text-gray-600 hover:text-gray-900">
                Find Talents
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                About us
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="text-gray-600 hover:text-gray-900">
                Testimonials
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Button 
        onClick={onCreateJobClick}
        className="bg-purple hover:bg-purple-dark text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Create Jobs
      </Button>
    </header>
  );
};

export default Header;
