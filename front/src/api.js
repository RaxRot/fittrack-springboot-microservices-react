import axios from "axios";
import keycloak from "./keycloak";

const api = axios.create({
    baseURL: "http://localhost:8080", // твой gateway
});

// добавляем токен во все запросы
api.interceptors.request.use(async (config) => {
    if (keycloak.authenticated) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
});

export default api;
