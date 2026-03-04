import axiosInstance from "./axios";

const BOOK_URL = "/books";

// ==========================
// GET ALL BOOKS (Pagination)
// ==========================
export const fetchBooks = async (page = 1) => {
  return axiosInstance.get(BOOK_URL, {
    params: { page },
  });
};

// ==========================
// SEARCH BOOKS
// ==========================
// export const searchBooks = async (query, page = 1) => {
//   return axiosInstance.get(`${BOOK_URL}/search`, {
//     params: { search: query, page }
//   });
// };

export const searchBooks = async (search, page = 1) => {
  return axiosInstance.get("/books/search", {
    params: { search, page },
  });
};

// ==========================
// CREATE BOOK
// ==========================
export const createBook = async (data) => {
  return axiosInstance.post(BOOK_URL, data);
};

// ==========================
// UPDATE BOOK (Description)
// ==========================
export const updateBook = async (id, description) => {
  return axiosInstance.put(`${BOOK_URL}/${id}`, {
    description,
  });
};

// ==========================
// DELETE BOOK
// ==========================
export const deleteBook = async (id) => {
  return axiosInstance.delete(`${BOOK_URL}/${id}`);
};
