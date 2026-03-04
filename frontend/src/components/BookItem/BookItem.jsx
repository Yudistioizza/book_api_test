import { useState } from "react";
import { updateBook, deleteBook } from "../../api/bookApi";
import "./BookItem.css";

function BookItem({ book, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(book.description);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateBook(book.id, description);
      setIsEditing(false);
      refresh();
    } catch (err) {
      alert("Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(book.id);
      refresh();
    } catch (err) {
      alert("Failed to delete book");
    }
  };

  return (
    <div className="bookitem-card">
      <div className="bookitem-header">
        <h3>{book.book_name}</h3>
        <span className="bookitem-date">Publish: {book.published_date}</span>
      </div>

      <p className="bookitem-author">by {book.author}</p>

      {isEditing ? (
        <div className="bookitem-edit">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="bookitem-actions">
            <button
              className="btn-primary"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              className="btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="bookitem-description">{book.description}</p>
          <div className="bookitem-actions">
            <button
              className="btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BookItem;