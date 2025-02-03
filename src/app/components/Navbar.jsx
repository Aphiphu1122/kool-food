import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-[#000] text-white p-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/">Koolkidklub</Link>
          </div>

          {/* Search Box - ย้ายไปข้างหน้า Sign In */}
          <div className="relative mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 text-black rounded-md w-64"
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex">
            <li className="mx-3"><Link href="/login">Sign In</Link></li>
            <li className="mx-3"><Link href="/register">Sign Up</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
