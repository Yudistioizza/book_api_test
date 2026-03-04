import "./Pagination.css";

function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  const pages = [];

  for (let i = 1; i <= lastPage; i++) {
    pages.push(
      <button
        key={i}
        className={`page-btn ${currentPage === i ? "active" : ""}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination-container">
      <button
        className="page-btn nav-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {pages}

      <button
        className="page-btn nav-btn"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;