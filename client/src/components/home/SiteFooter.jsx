import React from "react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="px-6 py-10 border-t border-white/5 text-sm text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Panel Planet Comics. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/login" className="hover:text-indigo-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-indigo-300">
            Sign Up
          </Link>
          <Link to="/contact" className="hover:text-indigo-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
