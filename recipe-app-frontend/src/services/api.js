import axios from "axios";

const api = axios.create({
    baseURL: "https://shared-recipe-book-app-b542151d3cf7.herokuapp.com/api",
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
