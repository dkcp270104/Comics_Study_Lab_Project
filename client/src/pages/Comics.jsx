import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth.js";
import { apiRequest, getApiUrl } from "../services/api";
export default function Comics() {
  const { user, token } = useAuth();
  const isAdmin = user?.role === "admin";
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    title: "",
    edition: "",
    description: "",
    coverColor: "from-indigo-500 to-purple-500",
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const apiBase = useMemo(() => getApiUrl(), []);
  const sortedComics = useMemo(() => {
    if (!comics.length) {
      return [];
    }
    const toStamp = (item) => new Date(item.updatedAt || item.createdAt || 0).getTime();
    return [...comics].sort((a, b) => {
      const diff = toStamp(b) - toStamp(a);
      if (diff !== 0) {
        return diff;
      }
      return (a.title || "").localeCompare(b.title || "");
    });
  }, [comics]);

  const loadComics = async () => {
    setLoading(true);
    setListError("");
    try {
      const data = await apiRequest("/api/comics");
      setComics(data);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.edition) {
      setFormError("Title and edition are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("edition", form.edition);
      payload.append("description", form.description);
      payload.append("coverColor", form.coverColor);
      if (imageFile) {
        payload.append("coverImage", imageFile);
      }

      const comic = await apiRequest("/api/comics", {
        method: "POST",
        body: payload,
        token,
      });

      setComics((prev) => [comic, ...prev]);
      setForm({
        title: "",
        edition: "",
        description: "",
        coverColor: "from-indigo-500 to-purple-500",
      });
      setImageFile(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this book?")) {
      return;
    }
    setDeletingId(id);
    setListError("");
    try {
      await apiRequest(`/api/comics/${id}`, {
        method: "DELETE",
        token,
      });
      setComics((prev) => prev.filter((comic) => comic._id !== id));
    } catch (err) {
      setListError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
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
            onClick={loadComics}
            className="self-start md:self-auto px-5 py-2.5 rounded-md border border-white/20 text-sm font-semibold hover:bg-white/10"
          >
            Refresh list
          </button>
        </div>

        {isAdmin && (
          <section className="mb-12 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold mb-4">Add a new book</h2>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-200 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-200 mb-2">Edition</label>
                <input
                  type="text"
                  name="edition"
                  value={form.edition}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="eg. Volume 1"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-200 mb-2">Short description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell readers what this book is about"
                ></textarea>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-200 mb-2">Accent gradient</label>
                <input
                  type="text"
                  name="coverColor"
                  value={form.coverColor}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="from-indigo-500 to-purple-500"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Used when no image is uploaded. Tailwind gradient classes work well.
                </p>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-200 mb-2">Cover image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-slate-200"
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-between">
                {formError && (
                  <span className="text-sm text-red-300">{formError}</span>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save book"}
                </button>
              </div>
            </form>
          </section>
        )}

        {listError && (
          <p className="mb-4 text-sm text-red-300">{listError}</p>
        )}

        {loading ? (
          <p className="text-slate-400">Loading books...</p>
        ) : sortedComics.length === 0 ? (
          <p className="text-slate-400">No books yet. Admin can add the first one above.</p>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedComics.map((item) => (
              <article
                key={item._id}
                className="group relative rounded-2xl bg-gradient-to-br from-indigo-600/60 via-purple-600/40 to-blue-500/30 p-[1px] shadow-xl shadow-indigo-900/20 transition-transform hover:-translate-y-1"
              >
                <div className="flex h-full flex-col rounded-2xl bg-slate-950/90 p-5 transition group-hover:bg-slate-900/90">
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    {item.coverImageUrl ? (
                      <img
                        src={`${apiBase}${item.coverImageUrl}`}
                        alt={item.title}
                        className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div
                        className={`h-48 w-full bg-gradient-to-br ${
                          item.coverColor || "from-indigo-500 to-purple-500"
                        } transition duration-300 group-hover:scale-[1.02]`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-100 backdrop-blur">
                      {item.edition || "New arrival"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 flex-1">
                    <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.description || "Fresh on the shelves."}
                    </p>
                  </div>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="mt-6 inline-flex items-center justify-center rounded-md border border-red-400 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10 disabled:opacity-60"
                    >
                      {deletingId === item._id ? "Removing..." : "Remove book"}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
