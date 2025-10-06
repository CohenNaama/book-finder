import axios from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 502 || status === 504) {
      error.userMessage = "Upstream service issue. Please try again shortly.";
    } else {
      error.userMessage = "Something went wrong. Check your connection and try again.";
    }
    return Promise.reject(error);
  }
);
