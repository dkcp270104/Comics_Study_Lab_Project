import React from "react";
import Navbar from "../components/Navbar";
import { featuredComics } from "../data/comics";

export default function Comics() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-wide text-sm text-indigo-300 mb-3">Browse Catalog</p>
            <h1 className="text-4xl font-bold">All Comics</h1>
            <p className="text-slate-400 mt-2">
              A mix of new releases and evergreen favorites hand-picked by the shop team.
            </p>
          </div>
          <button className="self-start md:self-auto px-5 py-2.5 rounded-md border border-white/20 text-sm font-semibold hover:bg-white/10">
            Filter (coming soon)
          </button>
        </div>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredComics.map((item) => (
            <article key={item.title} className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
              <div className={`h-44 rounded-lg bg-gradient-to-br ${item.colors} mb-4`} />
              <h2 className="text-2xl font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-indigo-300 mb-3">{item.issue}</p>
              <p className="text-slate-300 text-sm mb-4">{item.blurb}</p>
              <button className="w-full px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white font-semibold">
                Add to pull list
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
