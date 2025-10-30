import React from "react";
import Navbar from "../components/Navbar";
import AboutIntro from "../components/about/AboutIntro.jsx";
import AboutHighlights from "../components/about/AboutHighlights.jsx";
import AboutOpportunities from "../components/about/AboutOpportunities.jsx";
import { quickLinks } from "../data/comics";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <AboutIntro />

        <AboutHighlights />

        <AboutOpportunities links={quickLinks} />
      </main>
    </div>
  );
}
