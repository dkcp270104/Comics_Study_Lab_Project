import React from "react";
import ComicCard from "./ComicCard.jsx";

export default function ComicGrid({ items, isAdmin, apiBase, deletingId, onDelete }) {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ComicCard
          key={item._id}
          comic={item}
          isAdmin={isAdmin}
          apiBase={apiBase}
          deletingId={deletingId}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
