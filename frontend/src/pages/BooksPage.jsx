import { useEffect, useState } from "react";
import { fetchBooks, createBook, updateBook, deleteBook } from "../api/bookApi";
import BookTable from "../components/BookTable";
import BookModal from "../components/BookModal";
import DeleteModal from "../components/DeleteModal";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null); // {text, error}

  const [addEditModal, setAddEditModal] = useState({ isOpen: false, book: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, book: null });

  const showMessage = (text, error = false) => {
    setMessage({ text, error });
    setTimeout(() => setMessage(null), 3000);
  };

  const loadBooks = async () => {
    try {
      const res = await fetchBooks(page, search);
      setBooks(res.data.data || []);
      setTotalPages(res.data.last_page || 1);
    } catch (err) {
      console.error(err);
      showMessage("Failed to load books", true);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [page, search]);

  const handleSaveBook = async (data) => {
    try {
      if (addEditModal.book) {
        await updateBook(addEditModal.book.id, { description: data.description });
        showMessage("Book updated successfully");
      } else {
        await createBook(data);
        showMessage("Book added successfully");
      }
      setAddEditModal({ isOpen: false, book: null });
      loadBooks();
    } catch (err) {
      showMessage(err.response?.data?.message || "Error saving book", true);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setDeleteModal({ isOpen: false, book: null });
      showMessage("Book deleted successfully");
      loadBooks();
    } catch (err) {
      showMessage("Error deleting book", true);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column", gap: "15px" }}>
      
      {/* Toast */}
      {message && (
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: message.error ? "#f8d7da" : "#d1e7dd",
            color: message.error ? "#842029" : "#0f5132",
            borderRadius: "8px",
            fontWeight: 600,
            transition: "all 0.3s",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Search & Add */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1.5px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={() => setAddEditModal({ isOpen: true, book: null })}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#0d6efd",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Book
        </button>
      </div>

      {/* Table */}
      <BookTable
        books={books}
        onEdit={(book) => setAddEditModal({ isOpen: true, book })}
        onDelete={(book) => setDeleteModal({ isOpen: true, book })}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginTop: "10px" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            style={{ padding: "5px 10px", cursor: "pointer" }}
            disabled={page === 1}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                backgroundColor: page === i + 1 ? "#0d6efd" : "#fff",
                color: page === i + 1 ? "#fff" : "#000",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{ padding: "5px 10px", cursor: "pointer" }}
            disabled={page === totalPages}
          >
            ›
          </button>
        </div>
      )}

      {/* Modals */}
      <BookModal
        isOpen={addEditModal.isOpen}
        book={addEditModal.book}
        onClose={() => setAddEditModal({ isOpen: false, book: null })}
        onSave={handleSaveBook}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        book={deleteModal.book}
        onClose={() => setDeleteModal({ isOpen: false, book: null })}
        onConfirm={handleDeleteBook}
      />
    </div>
  );
}
