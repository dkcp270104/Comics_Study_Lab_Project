import React from "react";

const highlights = [
  {
    title: "Local Roots",
    description: "We partner with neighborhood artists and host signings to keep the scene lively.",
  },
  {
    title: "Guided Picks",
    description: "Need a new obsession? Tell us what you love and we will build a reading stack for you.",
  },
  {
    title: "Cozy Hangouts",
    description: "Friday sketch jams, trivia nights, and panel talks keep the shop buzzing.",
  },
];

export default function AboutHighlights() {
  return (
    <section className="grid gap-6 sm:grid-cols-3 mb-12">
      {highlights.map((item) => (
        <div key={item.title} className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">{item.title}</h2>
          <p className="text-sm text-slate-400">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
