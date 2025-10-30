import React from "react";
import Navbar from "../components/Navbar";
import { quickLinks } from "../data/comics";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <p className="uppercase tracking-wide text-sm text-indigo-300 mb-3">About Panel Planet</p>
        <h1 className="text-4xl font-bold mb-6">A friendly comic shop for every kind of reader</h1>
        <p className="text-slate-300 leading-relaxed mb-10">
          Panel Planet started as a tiny pop-up stall and grew into a weekly hangout spot where fans swap
          recommendations, celebrate new story arcs, and discover hidden gems. We keep our shelves curated with
          indie art books, superhero epics, slice-of-life zines, and manga favorites so there is always something new
          to explore.
        </p>

        <section className="grid gap-6 sm:grid-cols-3 mb-12">
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Local Roots</h2>
            <p className="text-sm text-slate-400">
              We partner with neighborhood artists and host signings to keep the scene lively.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Guided Picks</h2>
            <p className="text-sm text-slate-400">
              Need a new obsession? Tell us what you love and we will build a reading stack for you.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Cozy Hangouts</h2>
            <p className="text-sm text-slate-400">
              Friday sketch jams, trivia nights, and panel talks keep the shop buzzing.
            </p>
          </div>
        </section>

        <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">What you can do here</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {quickLinks.map((link) => (
              <div key={link.label} className="bg-slate-950/60 border border-white/5 rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-2">{link.label}</h3>
                <p className="text-sm text-slate-400">{link.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
