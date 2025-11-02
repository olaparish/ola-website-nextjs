import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export class APIError extends Error {
  constructor(message: string, public status?: number, public data?: unknown) {
    super(message);
    this.name = "APIError";
  }
}

// // ✅ Request interceptor (optional)
// api.interceptors.request.use(
//   (config) => {
//     // Example: attach auth token
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// ❌ Response interceptor — Catch & Parse Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred.";
    let statusCode = 0;

    if (error.response) {
      // Server responded with an error status code
      statusCode = error.response.status;

      const data = error.response.data;
      if (typeof data === "string") {
        errorMessage = data;
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      } else {
        errorMessage = `Error ${statusCode}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      // No response received from server
      errorMessage =
        "No response from server. Please check your network connection.";
    } else {
      // Something else happened
      errorMessage = error.message;
    }

    console.error("Axios Error:", {
      status: statusCode,
      message: errorMessage,
      details: error,
    });

    toast.error("Error fetching data");

    // You can standardize the error before throwing
    return Promise.reject({
      status: statusCode,
      message: errorMessage,
      original: error,
    });
  }
);

export default api;
