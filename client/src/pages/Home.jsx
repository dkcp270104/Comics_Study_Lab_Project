import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { quickLinks } from "../data/comics";
import { apiRequest, getApiUrl } from "../services/api";
import { useAuth } from "../context/useAuth.js";

export default function Home() {
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);
  const isAdmin = user?.role === "admin";
  const [featured, setFeatured] = useState([]);
  const [error, setError] = useState("");
  const apiBase = useMemo(() => getApiUrl(), []);

  useEffect(() => {
    apiRequest("/api/comics")
      .then((data) => {
        setFeatured(data.slice(0, 4));
      })
      .catch(() => {
        setError("Could not load books right now.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <p className="uppercase tracking-widest text-sm text-blue-100 mb-3">
              Welcome to Panel Planet
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
              Your cozy corner for comic book adventures
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Discover new stories, follow classic runs, and build a collection that
              feels personal. We hand-pick every title so it is easy for you to dive in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/comics"
                    className="inline-flex justify-center items-center rounded-md bg-white text-indigo-700 font-semibold px-6 py-3 shadow-md hover:bg-blue-100 transition"
                  >
                    Browse the full catalog
                  </Link>
                  <Link
                    to={isAdmin ? "/comics#admin-form" : "/contact"}
                    className="inline-flex justify-center items-center rounded-md border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
                  >
                    {isAdmin ? "Add a new book" : "Join community events"}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex justify-center items-center rounded-md bg-white text-indigo-700 font-semibold px-6 py-3 shadow-md hover:bg-blue-100 transition"
                  >
                    Create your free account
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex justify-center items-center rounded-md border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
                  >
                    Sign in instead
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-1/2">
            {error ? (
              <div className="col-span-2 rounded-xl bg-white/10 p-6 text-sm text-white/80">
                {error}
              </div>
            ) : featured.length === 0 ? (
              <div className="col-span-2 rounded-xl bg-white/10 p-6 text-sm text-white/80">
                Add books from the admin account to see them here.
              </div>
            ) : (
              featured.map((item) => (
                <div
                  key={item._id}
                  className={`rounded-xl bg-slate-950/30 p-4 shadow-lg flex flex-col gap-3`}
                >
                  {item.coverImageUrl ? (
                    <img
                      src={`${apiBase}${item.coverImageUrl}`}
                      alt={item.title}
                      className="h-24 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className={`h-24 rounded-lg bg-gradient-to-br ${item.coverColor || "from-indigo-500 to-purple-500"}`} />
                  )}
                  <div>
                    <span className="text-xs uppercase tracking-wide text-white/70">
                      {item.edition}
                    </span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm">
                    {item.description || "A fresh pick from our shelves."}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
          {quickLinks.map((link) => (
            <div key={link.label} className="bg-slate-900/70 rounded-xl p-6 border border-white/5">
              <h3 className="text-xl font-semibold mb-2">{link.label}</h3>
              <p className="text-slate-400 text-sm mb-4">{link.description}</p>
              <button className="text-indigo-300 font-medium hover:text-indigo-200">
                Learn more
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
    <h2 className="text-3xl font-bold mb-4">Ready for more stories?</h2>
        <p className="text-slate-400 mb-8">
          Jump into our full catalog to explore fresh series, indie gems, and classic reprints. Your next favorite arc is waiting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/comics"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-md"
          >
            Browse all comics
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 rounded-md border border-white/20 text-white font-semibold hover:bg-white/10"
          >
            Learn about us
          </Link>
        </div>
      </section>

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
    </div>
  );
}
