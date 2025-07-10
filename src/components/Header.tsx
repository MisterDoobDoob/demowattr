import React from 'react';
import { Droplets } from 'lucide-react';

interface HeaderProps {
  currentProfile: string;
}

const Header: React.FC<HeaderProps> = ({ currentProfile }) => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-full">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Wattr</h1>
            <p className="text-sm text-gray-400">Water Usage Tracker</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Current Profile</p>
          <p className="text-lg font-semibold text-blue-400">{currentProfile}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;