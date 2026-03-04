import { useState } from "react";
import { createBook } from "../../api/bookApi";
import "./BookForm.css";

function BookForm({ refresh, onClose, showToast }) {
  const [form, setForm] = useState({
    book_name: "",
    author: "",
    description: "",
    published_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await createBook(form);
      setMessage("Book successfully added!");
      setForm({
        book_name: "",
        author: "",
        description: "",
        published_date: "",
      });
      showToast("success", "Book successfully added!");
      refresh();
      onClose();
    } catch (err) {
    if (err.response?.status === 422) {
        showToast("error", err.response.data.message || "Validation error");
    } else {
        showToast("error", "Something went wrong");
    }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>×</button>
                <div className="bookform-container">
            <h2 className="bookform-title">Add New Book</h2>

            <form onSubmit={handleSubmit} className="bookform-form">
                <div className="form-group">
                <label>Book Name<span className="required-star">*</span></label>
                <input
                    type="text"
                    name="book_name"
                    value={form.book_name}
                    onChange={handleChange}
                    required
                    maxLength={150}
                />
                </div>

                <div className="form-group">
                <label>Author<span className="required-star">*</span></label>
                <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                    maxLength={150}
                />
                </div>

                <div className="form-group">
                <label>Published Date<span className="required-star">*</span></label>
                <input
                    type="date"
                    name="published_date"
                    value={form.published_date}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group">
                <label>Description<span className="required-star">*</span></label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />
                </div>

                <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Book"}
                </button>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
            </div>
        </div>
        </div>
    
  );
}

export default BookForm;