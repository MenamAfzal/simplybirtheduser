import axios from "axios";
import { BASE_URL } from "../constants";

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
    req.headers.Authorization = ``;
    return req;
});

export default API