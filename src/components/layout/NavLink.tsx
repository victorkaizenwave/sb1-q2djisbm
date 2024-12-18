import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children, icon: Icon }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </Link>
  );
};