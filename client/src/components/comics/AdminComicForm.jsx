import React from "react";

export default function AdminComicForm({
  form,
  formError,
  saving,
  previewUrl,
  onInputChange,
  onImageChange,
  onSubmit,
  onReset,
}) {
  return (
    <section className="mb-12 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold mb-4">Add a new book</h2>
      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-slate-200 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onImageChange}
            className="w-full text-sm text-slate-200"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Cover preview"
              className="mt-3 h-36 w-full rounded-lg object-cover border border-white/10"
            />
          )}
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {formError && <span className="text-sm text-red-300">{formError}</span>}
          <div className="flex gap-3">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Reset form
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save book"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
