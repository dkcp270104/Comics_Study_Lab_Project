import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import CatalogHeader from "../components/comics/CatalogHeader.jsx";
import AdminComicForm from "../components/comics/AdminComicForm.jsx";
import ComicGrid from "../components/comics/ComicGrid.jsx";
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
  const [previewUrl, setPreviewUrl] = useState("");

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

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl("");
      return undefined;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const resetForm = () => {
    setForm({
      title: "",
      edition: "",
      description: "",
      coverColor: "from-indigo-500 to-purple-500",
    });
    setImageFile(null);
    setPreviewUrl("");
    setFormError("");
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
      resetForm();
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
        <CatalogHeader loading={loading} onRefresh={loadComics} />

        {listError && <p className="mb-4 text-sm text-red-300">{listError}</p>}

        {isAdmin && (
          <AdminComicForm
            form={form}
            formError={formError}
            saving={saving}
            previewUrl={previewUrl}
            onInputChange={handleInputChange}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />
        )}
        {loading ? (
          <p className="text-slate-400">Loading books...</p>
        ) : sortedComics.length === 0 ? (
          <p className="text-slate-400">No books yet. Admin can add the first one above.</p>
        ) : (
          <ComicGrid
            items={sortedComics}
            isAdmin={isAdmin}
            apiBase={apiBase}
            deletingId={deletingId}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
