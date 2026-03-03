import axios from "axios";

const API_URL = "http://localhost:8000/api/books"; // sesuaikan URL backend

// Fetch books dengan pagination & search
export const fetchBooks = (page = 1, search = "") =>
  axios.get(API_URL, { params: { page, search } });

// Create new book
export const createBook = (data) => axios.post(API_URL, data);

// Update book (deskripsi saja)
export const updateBook = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete book
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
