/**
 * API service for book-related operations.
 *
 * Provides functions for searching books and fetching book details
 * from the Flask backend, which integrates with the Google Books API.
 *
 * Exports clean, reusable API methods for frontend data fetching.
 */

import { api } from "./client";


export const searchBooks = async (q) => {
  try {
    const { data } = await api.get("/api/books/search", { params: { q } });
    return {
      total: data?.total || 0,
      items: data?.items || [],
    };
  } catch (error) {
    throw new Error(error?.userMessage || "Failed to fetch books.");
  }
};


export const getBook = async (id) => {
  try {
    const { data } = await api.get(`/api/books/${id}`);
    return data || {};
  } catch (error) {
    throw new Error(error?.userMessage || "Failed to fetch book details.");
  }
};
