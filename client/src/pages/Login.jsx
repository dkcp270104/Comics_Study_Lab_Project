import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    alert("Logged in successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="flex items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-white/10 px-8 py-10 rounded-2xl shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-slate-400 text-sm mt-2">
              Sign in to keep up with the newest issues and store events.
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-slate-400 mt-6">
            New here? <Link to="/signup" className="text-indigo-300 hover:text-indigo-200 font-medium">Create an account</Link>
          </p>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-indigo-200">
              Back to home
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
