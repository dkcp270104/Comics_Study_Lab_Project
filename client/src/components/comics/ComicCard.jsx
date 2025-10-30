import React from "react";

export default function ComicCard({ comic, isAdmin, apiBase, onDelete, deletingId }) {
  const { _id, title, edition, description, coverImageUrl, coverColor } = comic;
  const imageSrc = coverImageUrl ? `${apiBase}${coverImageUrl}` : null;

  return (
    <article className="group relative rounded-2xl bg-gradient-to-br from-indigo-600/60 via-purple-600/40 to-blue-500/30 p-[1px] shadow-xl shadow-indigo-900/20 transition-transform hover:-translate-y-1">
      <div className="flex h-full flex-col rounded-2xl bg-slate-950/90 p-5 transition-colors group-hover:bg-slate-900/90">
        <div className="relative mb-4 overflow-hidden rounded-xl">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className={`h-48 w-full bg-gradient-to-br ${coverColor || "from-indigo-500 to-purple-500"} transition duration-300 group-hover:scale-[1.02]`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-100 backdrop-blur">
            {edition || "New arrival"}
          </span>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <h2 className="text-xl font-semibold text-white">Title : {title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed"> Description :  {description || "Fresh on the shelves."}</p>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={() => onDelete(_id)}
            disabled={deletingId === _id}
            className="mt-6 inline-flex items-center justify-center rounded-md border border-red-400 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10 disabled:opacity-60"
          >
            {deletingId === _id ? "Removing..." : "Remove book"}
          </button>
        )}
      </div>
    </article>
  );
}
