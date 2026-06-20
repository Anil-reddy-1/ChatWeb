import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL
});

api.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem("ChatUserData"));
    if (userData && userData.token) {
        config.headers.authorization = 'Bearer ' + userData.token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { api };
