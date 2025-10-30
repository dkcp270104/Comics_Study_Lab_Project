import React from "react";

export default function AboutOpportunities({ links }) {
  return (
    <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-4">What you can do here</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {links.map((link) => (
          <div
            key={link.label}
            className="bg-slate-950/60 border border-white/5 rounded-xl p-5"
          >
            <h3 className="text-lg font-semibold mb-2">{link.label}</h3>
            <p className="text-sm text-slate-400">{link.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
