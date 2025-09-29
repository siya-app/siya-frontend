import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8080', 
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});


API.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem('token'); // O sessionStorage.getItem('token');

    if (token) {
   
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Frontend: Token enviat a la capcelera d'Authorization.")
    }else {
            console.log("Frontend: No s'ha trobat authToken en localStorage."); 
        }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos un 401 (No autorizado) y hay un token, podría significar que el token es inválido/expirado
    const { response, config } = error;
    if (response && response.status === 401) {
      if (!config?.url?.includes("/users/")) {
        console.log('Token expirat o invàlid. Redirigint al login...');
        localStorage.removeItem('token');
        localStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  }
);



export default API;