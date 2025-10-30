import React from "react";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready for more stories?</h2>
      <p className="text-slate-400 mb-8">
        Jump into our full catalog to explore fresh series, indie gems, and classic reprints.
        Your next favorite arc is waiting.
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
  );
}
