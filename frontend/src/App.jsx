import { useEffect, useState } from "react";
import "./App.css";

import { fetchBooks, searchBooks } from "./api/bookApi";

import BookForm from "./components/BookForm/BookForm";
import BookList from "./components/BookList/BookList";
import Pagination from "./components/Pagination/Pagination";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const loadBooks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchBooks(page);
      setBooks(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setSearchMode(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSearch = async (query) => {
  //   if (!query) {
  //     loadBooks(1);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await searchBooks(query);
  //     setBooks(response.data.data);
  //     setCurrentPage(response.data.current_page);
  //     setLastPage(response.data.last_page);
  //     setSearchMode(true);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = async (value) => {
    if (!value) {
      loadBooks(1);
      return;
    }

    setLoading(true);
    try {
      const response = await searchBooks(value, 1);
      setBooks(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
    {toast && (
                <div className={`toast ${toast.type}`}>
                  {toast.message}
                </div>
              )}
    <div className="container">
      <div className="app-wrapper">
          <div className="app-container">
            <header className="app-header">
              <h1>Book Management</h1>
            </header>

              <div className="top-bar">
                <SearchBar onSearch={handleSearch} />

                <button
                  onClick={() => setShowModal(true)}
                  className="add-btn"
                >
                  + Add Book
                </button>
              </div>

              {showModal && (
                <BookForm
                  refresh={loadBooks}
                  onClose={() => setShowModal(false)}
                  showToast={showToast}
                />
              )}

            {loading ? (
              <div className="loading-state">Loading books...</div>
            ) : (
              <>
                <BookList books={books} refresh={() => loadBooks(currentPage)} />

                {!searchMode && (
                  <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={loadBooks}
                  />
                )}
              </>
            )}
          </div>
        </div>
    </div>
    </>
  );
}

export default App;