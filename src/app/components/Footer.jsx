import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo & Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold">Koolkidklub</p>
          <p className="text-sm text-gray-400">© 2024 All rights reserved.</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <Link href="https://facebook.com" target="_blank" className="hover:text-gray-400 transition">
            <Facebook size={24} />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-gray-400 transition">
            <Twitter size={24} />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="hover:text-gray-400 transition">
            <Instagram size={24} />
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
