import React from "react";

export default function CatalogHeader({ loading, onRefresh }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
      <div>
        <p className="uppercase tracking-wide text-sm text-indigo-300 mb-3">Browse Catalog</p>
        <h1 className="text-4xl font-bold">All Books</h1>
        <p className="text-slate-400 mt-2">
          A mix of new releases and evergreen favorites hand-picked by the shop team.
        </p>
      </div>
      <button
        type="button"
        onClick={() => !loading && onRefresh()}
        disabled={loading}
        className="self-start md:self-auto px-5 py-2.5 rounded-md border border-white/20 text-sm font-semibold hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Refreshing..." : "Refresh list"}
      </button>
    </div>
  );
}
