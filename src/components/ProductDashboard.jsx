

import React, { useEffect, useMemo, useState } from "react";

/* ---------------- IMAGE IMPORTS ----------------
   Make sure these exact files exist in src/assets/images/
*/
import m1 from "../assets/images/m1.png";
import m2 from "../assets/images/m2.png";
import m3 from "../assets/images/m3.png";
import m4 from "../assets/images/m4.png";

import j1 from "../assets/images/j1.png";
import j2 from "../assets/images/j2.png";
import j3 from "../assets/images/j3.png";
import j4 from "../assets/images/j4.png";

import s1 from "../assets/images/s1.png";
import s2 from "../assets/images/s2.png";
import s3 from "../assets/images/s3.png";
import s4 from "../assets/images/s4.png";

import b1 from "../assets/images/b1.png";
import b2 from "../assets/images/b2.png";
import b3 from "../assets/images/b3.png";
import b4 from "../assets/images/b4.png";

/* ---------------- INITIAL PRODUCTS ---------------- */
const initialProducts = [
  {
    id: "MURRAH-001",
    name: "Murrah Buffalo",
    age: "3 years",
    location: "Uttar Pradesh",
    price: 175000,
    insurance: 13000,
    stock: true,
    images: [m1, m2, m3, m4],
    description:
      "Murrah buffalo is famous for high milk yield, strong build and best dairy performance in India.",
  },
  {
    id: "JAFF-001",
    name: "Jaffarabadi Buffalo",
    age: "3 years",
    location: "Gujarat",
    price: 180000,
    insurance: 13000,
    stock: true,
    images: [j1, j2, j3, j4],
    description:
      "Jaffarabadi is one of the heaviest buffalo breeds, known for massive size and rich milk.",
  },
  {
    id: "SURTI-001",
    name: "Surti Buffalo",
    age: "3 years",
    location: "Surat",
    price: 120000,
    insurance: 13000,
    stock: false,
    images: [s1, s2, s3, s4],
    description:
      "Surti buffalo is medium-sized, known for calm nature and moderate milk yield with high fat content.",
  },
  {
    id: "BHAD-001",
    name: "Bhadawari Buffalo",
    age: "3 years",
    location: "Etawah",
    price: 100000,
    insurance: 13000,
    stock: false,
    images: [b1, b2, b3, b4],
    description:
      "Bhadawari buffaloes are heat resistant and produce milk with very high butterfat content.",
  },
];

/* ---------------- Helpers ---------------- */
const placeholder = "https://via.placeholder.com/900x600?text=No+Image";

function makeIdFromName(name = "") {
  return (
    name
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 12) + "-" + Math.floor(Math.random() * 900 + 100)
  );
}

/* ---------------- ProductCard (carousel) ---------------- */
function ProductCard({ product, onEdit, theme }) {
  const imgs = (product.images && product.images.length ? product.images : [placeholder]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= imgs.length) setIndex(0);
  }, [imgs.length, index]);

  const prev = () => setIndex((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setIndex((i) => (i + 1) % imgs.length);
  const goTo = (i) => setIndex(i);

  return (
    <article className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-200 dark:border-slate-700 ${theme === "dark" ? "dark:bg-slate-800" : ""
      }`}>
      <div className="relative bg-gray-200 dark:bg-slate-700 w-full h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imgs[index]}
          alt={`${product.name} ${index + 1}`}
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        {imgs.length > 1 && (
          <>
            <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-xl px-2 py-1 rounded transition" onClick={prev} aria-label="Previous image">‹</button>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-xl px-2 py-1 rounded transition" onClick={next} aria-label="Next image">›</button>
          </>
        )}

        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">{index + 1} / {imgs.length}</div>

        <div className={`absolute top-2 right-2 px-3 py-1 rounded text-sm font-semibold ${product.stock
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
          }`}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      <div className="flex gap-1 p-2 bg-gray-100 dark:bg-slate-700 overflow-x-auto">
        {imgs.map((s, i) => (
          <img
            key={i}
            src={s}
            className={`w-12 h-12 object-cover rounded cursor-pointer transition ${i === index ? "ring-2 ring-teal-500" : "opacity-60 hover:opacity-100"
              }`}
            onClick={() => goTo(i)}
            alt={`thumb ${i + 1}`}
            onError={(e) => (e.currentTarget.src = placeholder)}
          />
        ))}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
          <div className="text-xl font-bold text-teal-600">₹{Number(product.price).toLocaleString()}</div>
        </div>

        <div className="space-y-1 mb-3 text-sm text-gray-600 dark:text-gray-400">
          <div><strong>Age:</strong> {product.age}</div>
          <div><strong>Location:</strong> {product.location}</div>
          <div><strong>ID:</strong> {product.id}</div>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex gap-2">
          <button className="btn-primary flex-1" onClick={() => onEdit(product)}>✏️ Edit</button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Main Dashboard ---------------- */
export default function ProductDashboard({ onBack }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(0);

  // theme
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  // edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [newImageInput, setNewImageInput] = useState("");

  // open edit
  function openEdit(product) {
    setEditingProduct({ ...product }); // copy
    setMainImageIndex(0);
    setNewImageInput("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingProduct(null);
    setMainImageIndex(0);
    setNewImageInput("");
  }

  // add image by URL or filename
  function addImageByURL() {
    const url = (newImageInput || "").trim();
    if (!url) return;
    setEditingProduct((p) => ({ ...p, images: [...(p.images || []), url] }));
    setNewImageInput("");
  }

  // add image by upload
  function handleFileUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditingProduct((p) => ({ ...p, images: [...(p.images || []), url] }));
  }

  function deleteImageAt(i) {
    setEditingProduct((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }));
    if (mainImageIndex === i) setMainImageIndex(0);
  }

  function moveImage(i, dir) {
    setEditingProduct((p) => {
      const arr = [...(p.images || [])];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return p;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...p, images: arr };
    });
  }

  function saveEdits(e) {
    e && e.preventDefault();
    if (!editingProduct || !editingProduct.name?.trim()) {
      alert("Product must have a name.");
      return;
    }
    setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
    closeModal();
  }

  function addNewProduct() {
    const base = {
      id: makeIdFromName("New Product"),
      name: "New Product",
      age: "N/A",
      location: "Unknown",
      price: 0,
      insurance: 0,
      stock: false,
      images: [placeholder],
      description: "",
    };
    setProducts((p) => [base, ...p]);
    // open editor for the new product
    setTimeout(() => openEdit(base), 50);
  }

  // filtered & pagination
  const filtered = useMemo(() => {
    const s = (search || "").trim().toLowerCase();
    return products.filter((p) => {
      if (stockFilter === "in" && !p.stock) return false;
      if (stockFilter === "out" && p.stock) return false;
      if (!s) return true;
      return (
        (p.name && p.name.toLowerCase().includes(s)) ||
        (p.location && p.location.toLowerCase().includes(s)) ||
        (p.id && p.id.toLowerCase().includes(s))
      );
    });
  }, [products, search, stockFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [totalPages, page]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-gray-50"}`}>
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition"
                onClick={onBack}
              >
                ← Back
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Markwave — Products</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
              placeholder="Search name, location, or id..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            />

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={stockFilter}
              onChange={(e) => { setStockFilter(e.target.value); setPage(0); }}
            >
              <option value="all">All</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            <button className="btn-primary" onClick={addNewProduct}>+ Add</button>

            {/* THEME TOGGLE */}
            <button
              className="text-2xl p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "🌞"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paged.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
              </div>
            ) : (
              paged.map((p) => (
                <ProductCard key={p.id} product={p} onEdit={openEdit} theme={theme} />
              ))
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={() => setPage((x) => Math.max(0, x - 1))}
              disabled={page === 0}
            >
              ← Previous
            </button>
            <div className="text-gray-700 dark:text-gray-300 font-semibold">Page {page + 1} of {totalPages}</div>
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={() => setPage((x) => Math.min(totalPages - 1, x + 1))}
              disabled={page === totalPages - 1}
            >
              Next →
            </button>
          </div>
        </section>
      </main>

      {/* EDIT MODAL */}
      {modalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onMouseDown={closeModal}>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onMouseDown={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit product</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>

            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); saveEdits(e); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, name: e.target.value }))}
                    required
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</label>
                  <input
                    value={editingProduct.age}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, age: e.target.value }))}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input
                  value={editingProduct.location}
                  onChange={(e) => setEditingProduct((p) => ({ ...p, location: e.target.value }))}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, price: Number(e.target.value) }))}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Insurance (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.insurance}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, insurance: Number(e.target.value) }))}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                <select
                  value={editingProduct.stock ? "true" : "false"}
                  onChange={(e) => setEditingProduct((p) => ({ ...p, stock: e.target.value === "true" }))}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct((p) => ({ ...p, description: e.target.value }))}
                  rows={4}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* IMAGE MANAGER */}
              <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
                <div className="font-bold text-gray-900 dark:text-white mb-3">Images ({(editingProduct.images || []).length})</div>

                <div className="flex gap-2 mb-4 flex-wrap">
                  <input
                    placeholder="Paste image URL or local filename (e.g. m1.png)"
                    value={newImageInput}
                    onChange={(e) => setNewImageInput(e.target.value)}
                    className="flex-1 min-w-40 px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={addImageByURL}
                    className="btn-primary"
                  >
                    Add URL
                  </button>
                  <label className="btn-secondary cursor-pointer">
                    Upload
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(editingProduct.images || []).length === 0 && (
                    <div className="col-span-3 text-center py-6 text-gray-500 dark:text-gray-400">No images yet</div>
                  )}
                  {(editingProduct.images || []).map((src, i) => (
                    <div className="relative bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden group" key={i}>
                      <img
                        src={src}
                        alt={`img-${i}`}
                        className="w-full h-24 object-cover"
                        onError={(e) => (e.currentTarget.src = placeholder)}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition">
                        <button
                          type="button"
                          onClick={() => moveImage(i, -1)}
                          disabled={i === 0}
                          className="p-1 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-500 text-white rounded"
                        >
                          ◀
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(i, +1)}
                          disabled={i === editingProduct.images.length - 1}
                          className="p-1 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-500 text-white rounded"
                        >
                          ▶
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteImageAt(i)}
                          className="p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                          🗑
                        </button>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate px-2 py-1">{String(src).split("/").pop()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-gray-200 dark:border-slate-700 pt-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEdits}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
