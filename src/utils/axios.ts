import axios from "axios";
import { toast } from "sonner";
import { getSession, signOut } from "next-auth/react";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: BASE_URL,
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

const session = await getSession();

// ✅ Request interceptor (optional)
api.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    const token = session?.tokenData.access.token || accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor — Catch & Parse Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred.";
    let statusCode = 0;

    if ((axios as any).isAxiosError(error) && error.response) {
      statusCode = error.response.status;

      // Prefer backend-provided message
      const data = error.response.data as any;
      if (typeof data === "string") {
        errorMessage = data;
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      } else {
        errorMessage = error.response.statusText || errorMessage;
      }

      // 🔐 Unauthorized → log out user
      if (statusCode === 401 && errorMessage === "Please authenticate") {
        signOut({ callbackUrl: "/auth" });
      }
    } else if (error.request) {
      errorMessage = "No response from server. Check your connection.";
    } else {
      errorMessage = error.message;
    }

    // Only show toast if it's not a 401 (optional decision, but usually good to avoid spamming if redirecting)
    // or you can show it. For now keeping existing behavior of showing error.
    if (statusCode !== 401) {
     console.error("Axios Error:", {
         status: statusCode,
         message: errorMessage,
         details: error,
       });
      toast.error(errorMessage);
    }

    return Promise.reject({
      message: errorMessage,
      statusCode,
      raw: error,
    });
  }
);

export default api;
