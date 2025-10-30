import React from "react";

export default function FeaturedShowcase({ items, error, apiBase }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:w-1/2">
      {error ? (
        <div className="col-span-2 rounded-xl bg-white/10 p-6 text-sm text-white/80">{error}</div>
      ) : items.length === 0 ? (
        <div className="col-span-2 rounded-xl bg-white/10 p-6 text-sm text-white/80">
          Add books from the admin account to see them here.
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            className="rounded-xl bg-slate-950/30 p-4 shadow-lg flex flex-col gap-3"
          >
            {item.coverImageUrl ? (
              <img
                src={`${apiBase}${item.coverImageUrl}`}
                alt={item.title}
                className="h-24 w-full rounded-lg object-cover"
              />
            ) : (
              <div
                className={`h-24 rounded-lg bg-gradient-to-br ${item.coverColor || "from-indigo-500 to-purple-500"}`}
              />
            )}
            <div>
              <span className="text-xs uppercase tracking-wide text-white/70">{item.edition}</span>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
            <p className="text-white/80 text-sm">
              {item.description || "A fresh pick from our shelves."}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
