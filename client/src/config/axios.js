import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined" && localStorage) {
      const token = localStorage.getItem("token");
      // config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3NWFmYTBmNTFmYjg5NmI4OGMyNDk0ZiIsImVtYWlsIjoic3RyaW5nIiwidXNlcm5hbWUiOiJzdHJpbmciLCJ0eXBlIjoiYWRtaW4ifSwiaWF0IjoxNzM0MDE1Njk5LCJleHAiOjE3MzQ0NDc2OTl9.UE-dfIFZDGtWroFcOqVssf0I5Krv5sjeVa7c_GW8jFs";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Server responded with a status code outside of 2xx
      console.error("Server Error:", error.response.data);
      console.error("Status Code:", error.response.status);
      errorMessage = error.response.data.message || "Server error occurred";
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
      errorMessage = "Network error - please check your connection";
    } else {
      // Something happened in setting up the request
      console.error("Request Error:", error.message);
      errorMessage = error.message || "Error setting up the request";
    }

    error.customMessage = errorMessage;
    return Promise.reject(error);
  }
);

export default axiosInstance;
