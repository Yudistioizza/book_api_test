import "./BookList.css";
import BookItem from "../BookItem/BookItem";

function BookList({ books, refresh }) {
  return (
    <div className="booklist-container">
      <h2 className="booklist-title">Book Collection</h2>

      {books.length === 0 ? (
        <div className="empty-state">
          <p>No books found</p>
        </div>
      ) : (
        <div className="booklist-grid">
          {books.map((book) => (
            <BookItem key={book.id} book={book} refresh={refresh} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;