

import React, { useEffect, useMemo, useState } from "react";
import "./ProductDashboard.css";

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
    <article className={`pd-card ${theme === "dark" ? "pd-card--dark" : ""}`}>
      <div className="pd-thumb">
        <img
          className="pd-main-img"
          src={imgs[index]}
          alt={`${product.name} ${index + 1}`}
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        {imgs.length > 1 && (
          <>
            <button className="pd-arrow pd-left" onClick={prev} aria-label="Previous image">‹</button>
            <button className="pd-arrow pd-right" onClick={next} aria-label="Next image">›</button>
          </>
        )}

        <div className="pd-counter">{index + 1} / {imgs.length}</div>

        <div className={`pd-badge ${product.stock ? "in" : "out"}`}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      <div className="pd-thumbs">
        {imgs.map((s, i) => (
          <img
            key={i}
            src={s}
            className={`pd-thumb-item ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            alt={`thumb ${i + 1}`}
            onError={(e) => (e.currentTarget.src = placeholder)}
          />
        ))}
      </div>

      <div className="pd-body">
        <div className="pd-row">
          <h3 className="pd-name">{product.name}</h3>
          <div className="pd-price">₹{Number(product.price).toLocaleString()}</div>
        </div>

        <div className="pd-meta">
          <div><strong>Age:</strong> {product.age}</div>
          <div><strong>Location:</strong> {product.location}</div>
          <div><strong>ID:</strong> {product.id}</div>
        </div>

        <p className="pd-desc">{product.description}</p>

        <div className="pd-actions">
          <button className="pd-edit" onClick={() => onEdit(product)}>✏️ Edit</button>
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
    <div className={`pd-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <header className="pd-header">
        <div className="pd-left">
          {onBack && <button className="pd-back" onClick={onBack}>← Back</button>}
          <div>
            <div className="pd-title">Markwave — Products</div>
            {/* <div className="pd-sub"></div> */}
          </div>
        </div>

        <div className="pd-right">
          <div className="pd-controls">
            <input
              className="pd-search"
              placeholder="Search name, location, or id..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            />

            <select
              className="pd-select"
              value={stockFilter}
              onChange={(e) => { setStockFilter(e.target.value); setPage(0); }}
            >
              <option value="all">All</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            <button className="pd-add" onClick={addNewProduct}>+ Add</button>

            {/* THEME TOGGLE */}
            <button
              className="pd-theme-toggle"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "🌞"}
            </button>
          </div>
        </div>
      </header>

      <main className="pd-main">
        <section className="pd-section">
          <div className="pd-grid">
            {paged.length === 0 ? (
              <div className="pd-empty">No products found</div>
            ) : (
              paged.map((p) => (
                <ProductCard key={p.id} product={p} onEdit={openEdit} theme={theme} />
              ))
            )}
          </div>

          <div className="pd-pagination">
            <button className="pd-page-btn" onClick={() => setPage((x) => Math.max(0, x - 1))} disabled={page === 0}>← Previous</button>
            <div className="pd-page-status">Page {page + 1} of {totalPages}</div>
            <button className="pd-page-btn" onClick={() => setPage((x) => Math.min(totalPages - 1, x + 1))} disabled={page === totalPages - 1}>Next →</button>
          </div>
        </section>
      </main>

      {/* EDIT MODAL */}
      {modalOpen && editingProduct && (
        <div className="pd-modal-backdrop" onMouseDown={closeModal}>
          <div className="pd-modal" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Edit product</h3>

            <form className="pd-form" onSubmit={(e) => { e.preventDefault(); saveEdits(e); }}>
              <div className="pd-row-two">
                <label>
                  Name
                  <input value={editingProduct.name} onChange={(e) => setEditingProduct((p) => ({ ...p, name: e.target.value }))} required />
                </label>

                <label>
                  Age
                  <input value={editingProduct.age} onChange={(e) => setEditingProduct((p) => ({ ...p, age: e.target.value }))} />
                </label>
              </div>

              <label>
                Location
                <input value={editingProduct.location} onChange={(e) => setEditingProduct((p) => ({ ...p, location: e.target.value }))} />
              </label>

              <div className="pd-row-two">
                <label>
                  Price (₹)
                  <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct((p) => ({ ...p, price: Number(e.target.value) }))} />
                </label>

                <label>
                  Insurance (₹)
                  <input type="number" value={editingProduct.insurance} onChange={(e) => setEditingProduct((p) => ({ ...p, insurance: Number(e.target.value) }))} />
                </label>
              </div>

              <label>
                Stock
                <select value={editingProduct.stock ? "true" : "false"} onChange={(e) => setEditingProduct((p) => ({ ...p, stock: e.target.value === "true" }))}>
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </label>

              {/* Description (large textarea) */}
              <label>
                Description
                <textarea className="pd-desc-area" value={editingProduct.description} onChange={(e) => setEditingProduct((p) => ({ ...p, description: e.target.value }))} />
              </label>

              {/* IMAGE MANAGER */}
              <div className="pd-images-manager">
                <div className="pd-images-header">Images ({(editingProduct.images || []).length})</div>

                <div className="pd-add-row">
                  <input placeholder="Paste image URL or local filename (e.g. m1.png)" value={newImageInput} onChange={(e) => setNewImageInput(e.target.value)} />
                  <button type="button" onClick={addImageByURL}>Add URL</button>
                  <label className="pd-upload">
                    Upload
                    <input type="file" accept="image/*" onChange={handleFileUpload} />
                  </label>
                </div>

                <div className="pd-images-list">
                  {(editingProduct.images || []).length === 0 && <div className="pd-no-img">No images yet</div>}
                  {(editingProduct.images || []).map((src, i) => (
                    <div className="pd-img-chip" key={i}>
                      <img src={src} alt={`img-${i}`} onError={(e) => (e.currentTarget.src = placeholder)} />
                      <div className="pd-img-actions">
                        <button type="button" onClick={() => moveImage(i, -1)} disabled={i === 0}>◀</button>
                        <button type="button" onClick={() => moveImage(i, +1)} disabled={i === editingProduct.images.length - 1}>▶</button>
                        <button type="button" onClick={() => deleteImageAt(i)}>🗑</button>
                      </div>
                      <div className="pd-img-name">{String(src).split("/").pop()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pd-form-actions">
                <button type="button" className="pd-cancel" onClick={closeModal}>Cancel</button>
                <button type="button" className="pd-save" onClick={saveEdits}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
