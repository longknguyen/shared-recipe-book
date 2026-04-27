import axios from "axios";

const defaultBaseURL = import.meta.env.DEV
    ? "http://localhost:8080/api"
    : "https://shared-recipe-book-app-b542151d3cf7.herokuapp.com/api";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || defaultBaseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Something went wrong.";

        return Promise.reject(new Error(message));
    },
);

export default api;
