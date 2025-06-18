import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:8080',
// });

// API.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

const API = axios.create({
  baseURL: 'http://localhost:8080', // <-- ¡AJUSTA ESTO A LA URL BASE DE TU API!
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});


API.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem('authToken'); // O sessionStorage.getItem('token');

    if (token) {
   
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Frontend: Token enviado en la cabecera Authorization.')
    }else {
            console.log('Frontend: No se encontró authToken en localStorage.'); 
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
    if (error.response && error.response.status === 401) {
      console.log('Token expirat o no válido. Redirigint al login...');
      localStorage.removeItem('authToken'); // Limpia el token
      // Aquí podrías redirigir al usuario a la página de login
      // window.location.href = '/login'; // O usar history.push si usas React Router
    }
    return Promise.reject(error);
  }
);





export default API;