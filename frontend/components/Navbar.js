'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, FileText, User, Lock, Menu, X } from 'lucide-react';
import { verifyToken, logout } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await verifyToken();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-cyan-400">CyberOp Notes</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Home size={18} />
              Home
            </Link>
            <Link href="/writeups" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <FileText size={18} />
              Writeups
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <User size={18} />
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/admin" className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-2">
                  <Lock size={18} />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/admin/login" className="text-cyan-400 hover:text-cyan-300 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/" className="block py-2 text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/writeups" className="block py-2 text-gray-300 hover:text-white">
              Writeups
            </Link>
            <Link href="/about" className="block py-2 text-gray-300 hover:text-white">
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/admin" className="block py-2 text-cyan-400">
                  Admin
                </Link>
                <button onClick={handleLogout} className="block py-2 text-red-400">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/admin/login" className="block py-2 text-cyan-400">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}