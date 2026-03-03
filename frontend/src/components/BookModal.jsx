import { useState, useEffect } from "react";

export default function BookModal({ isOpen, onClose, onSave, book }) {
  const [form, setForm] = useState({
    book_name: "",
    author: "",
    description: "",
    published_date: "",
  });

  useEffect(() => {
    if (book) {
      // Edit mode: hanya description yang bisa diubah
      setForm({
        book_name: book.book_name || "",
        author: book.author || "",
        published_date: book.published_date || "",
        description: book.description || "",
      });
    } else {
      // Add mode: kosongkan semua
      setForm({
        book_name: "",
        author: "",
        published_date: "",
        description: "",
      });
    }
  }, [book]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        width: "400px",
        maxWidth: "90%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: 600 }}>
          {book ? "Edit Book Description" : "Add New Book"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {!book && (
            <>
              <input
                name="book_name"
                placeholder="Book Name"
                value={form.book_name}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  outline: "none"
                }}
                autoFocus
              />
              <input
                name="author"
                placeholder="Author"
                value={form.author}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
              <input
                type="date"
                name="published_date"
                value={form.published_date}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </>
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
              outline: "none",
              resize: "vertical",
              minHeight: "80px"
            }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 18px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              {book ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
