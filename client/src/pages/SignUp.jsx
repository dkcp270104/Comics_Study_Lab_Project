import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Signup successful!");
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
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="text-slate-400 text-sm mt-2">
              Set up your profile so we can share comic picks made just for you.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-200 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Create account
          </button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account? <Link to="/login" className="text-indigo-300 hover:text-indigo-200 font-medium">Log in</Link>
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
