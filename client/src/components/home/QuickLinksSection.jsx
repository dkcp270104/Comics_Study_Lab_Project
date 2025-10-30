import React from "react";

export default function QuickLinksSection({ links }) {
  return (
    <section className="bg-slate-900/50 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
        {links.map((link) => (
          <div
            key={link.label}
            className="bg-slate-900/70 rounded-xl p-6 border border-white/5"
          >
            <h3 className="text-xl font-semibold mb-2">{link.label}</h3>
            <p className="text-slate-400 text-sm mb-4">{link.description}</p>
            <button className="text-indigo-300 font-medium hover:text-indigo-200">
              Learn more
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
