import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  // headers: { Authorization: `Bearer ${token}` } si tens auth
  withCredentials: true, // si necessites cookies/sessions
});

export default api;
