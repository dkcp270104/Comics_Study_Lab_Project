import React from "react";
import { Link } from "react-router-dom";
import FeaturedShowcase from "./FeaturedShowcase.jsx";

export default function HeroSection({ isLoggedIn, isAdmin, featured, error, apiBase }) {
  return (
    <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600">
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-12 lg:flex-row lg:items-center">
        <div className="lg:w-1/2">
          <p className="uppercase tracking-widest text-sm text-blue-100 mb-3">
            Welcome to Comic study lab IIT Jodhpur
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Your cozy corner for comic book 
          </h1>
          <p className="text-lg text-blue-100 mb-8">
            Discover new stories, follow classic runs, and build a collection that feels personal.
            Every pick is hand-curated so it is easy to dive in.
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

        <FeaturedShowcase items={featured} error={error} apiBase={apiBase} />
      </div>
    </section>
  );
}
