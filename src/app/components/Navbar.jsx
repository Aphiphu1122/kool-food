import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-black text-white p-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">Koolkidklub</Link>
        </div>

        {/* Search Box - จัดให้อยู่ตรงกลาง */}
        <div className="flex-grow flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li><Link href="/login">Sign In</Link></li>
          <li><Link href="/register">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
