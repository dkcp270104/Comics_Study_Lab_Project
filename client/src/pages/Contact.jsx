import React from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="uppercase tracking-wide text-sm text-indigo-300 mb-3">Contact Us</p>
        <h1 className="text-4xl font-bold mb-4">Let’s connect</h1>
        <p className="text-slate-300 leading-relaxed mb-10">
          Reach out directly to Dr. Natasa Thoudam for collaborations, course information, or questions about
          humanities research projects.
        </p>

        <section className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Primary Contact</h2>
            <p className="text-sm text-slate-300 font-medium">Dr. Natasa Thoudam</p>
            <p className="text-sm text-slate-400 mb-4">
              Assistant Professor<br />
              School of Liberal Arts<br />
              Digital Humanities (DH)-IDRD
            </p>
            <p className="text-sm text-slate-400">
              Indian Institute of Technology Jodhpur<br />
              NH62, Nagaur Road, Karwar<br />
              Jodhpur 342030, Rajasthan, INDIA
            </p>
          </div>
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Get in Touch</h2>
            <p className="text-sm text-slate-400">
              Email: <a href="mailto:nthoudam@iitj.ac.in" className="text-indigo-300 hover:text-indigo-200">nthoudam@iitj.ac.in</a>
            </p>
            <p className="text-sm text-slate-400 mt-3">
              Office: School of Liberal Arts, IIT Jodhpur
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Please include your name, institution, and a short note about how we can help.
            </p>
          </div>
        </section>

        <form className="bg-slate-900/60 border border-white/5 rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tell us what you need"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white font-semibold"
          >
            Send message
          </button>
        </form>
      </main>
    </div>
  );
}
