import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: { Authorization: `Bearer ${token}` } si tens auth
  withCredentials: true, // si necessites cookies/sessions
});

export default api;
