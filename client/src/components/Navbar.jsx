import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-indigo-300">
          Panel Planet
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <Link to="/" className="hover:text-indigo-300 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-300 transition">
            About
          </Link>
          <Link to="/comics" className="hover:text-indigo-300 transition">
            All Comics
          </Link>
          <Link to="/contact" className="hover:text-indigo-300 transition">
            Contact Us
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-white/20 text-sm font-semibold hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-indigo-500 text-sm font-semibold hover:bg-indigo-400"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <nav className="md:hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap gap-4 text-sm font-medium text-slate-200">
          <Link to="/" className="hover:text-indigo-300 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-300 transition">
            About
          </Link>
          <Link to="/comics" className="hover:text-indigo-300 transition">
            All Comics
          </Link>
          <Link to="/contact" className="hover:text-indigo-300 transition">
            Contact Us
          </Link>
          <Link to="/login" className="hover:text-indigo-300 transition">
            Login
          </Link>
          <Link to="/signup" className="hover:text-indigo-300 transition">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
