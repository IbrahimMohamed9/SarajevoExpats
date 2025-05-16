import axios from "axios";
import https from "https";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  instance.interceptors.request.use(
    async (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
      }

      if (typeof window === "undefined") {
        try {
          const { cookies } = await import("next/headers");
          const cookieStore = cookies();

          if (cookieStore && typeof cookieStore.getAll === "function") {
            const cookieString = cookieStore
              .getAll()
              .map((cookie) => `${cookie.name}=${cookie.value}`)
              .join("; ");

            if (cookieString) {
              config.headers.Cookie = cookieString;

              const tokenMatch = cookieString.match(/access_token=([^;]+)/);
              if (tokenMatch && tokenMatch[1]) {
                config.headers.authorization = `Bearer ${tokenMatch[1]}`;
              }
            }
          }
        } catch (error) {
          console.error("Error accessing cookies in SSR:", error);
        }

        config.headers["x-server-side"] = "true";
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      let errorMessage = "An unexpected error occurred";

      if (error.response) {
        console.error("Server Error:", error.response.data);
        console.error("Status Code:", error.response.status);
        errorMessage = error.response.data.message || "Server error occurred";
      } else if (error.request) {
        console.error("Network Error:", error.request);
        errorMessage = "Network error - please check your connection";
      } else {
        console.error("Request Error:", error.message);
        errorMessage = error.message || "Error setting up the request";
      }

      error.customMessage = errorMessage;
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
