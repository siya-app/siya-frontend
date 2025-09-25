// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // La URL base de tu backend

export const api = {
  /**
   * Busca una terraza por su referencia catastral.
   * @param {string} catastroRef - La referencia catastral de la terraza.
   * @returns {Promise<object>} Un objeto con `success: true` y los datos de la terraza, o `success: false` y un mensaje de error.
   */
  findTerraceByCatastro: async (catastroRef: string) => {
    try {
      // Endpoint para buscar terrazas por referencia catastral
      // Ajusta 'terraces/by-catastro' si tu endpoint es diferente
      const response = await axios.get(`${API_BASE_URL}/terraces/by-catastro/${catastroRef}`);
      return { success: true, terrace: response.data };

    } catch (error: any) {

      if ((error).response) {
        // El servidor respondió con un estado de error (ej. 404 Not Found, 400 Bad Request)

        if (error.response.status === 404) {
          return { success: false, message: "No se encontró ninguna terraza con esa referencia catastral." };
        }
        // Otros errores del servidor
        return { success: false, message: error.response.data.message || "Error del servidor al buscar la terraza." };

      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta (ej. red caída, CORS)
        return { success: false, message: "No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde." };

      } else {
        // Algo más causó el error
        return { success: false, message: "Ha ocurrido un error inesperado al buscar la terraza." };
      }
    }
  },

  /**
   * Actualiza el rol de un usuario a 'owner' y le asigna una terraza.
   * @param {string} userId - El ID del usuario que se va a actualizar.
   * @param {string} terraceId - El ID de la terraza que se asignará al usuario.
   * @returns {Promise<object>} Un objeto con `success: true` y un mensaje de éxito, o `success: false` y un mensaje de error.
   */

  updateUserRoleAndTerrace: async (userId: string, terraceId: string) => {
    try {
      const token = localStorage.getItem('token');
      // Endpoint para actualizar el usuario y asignarle la terraza
      // Ajusta 'users/${userId}/claim-terrace' si tu endpoint es diferente

      const response = await axios.put(`${API_BASE_URL}/users/${userId}/claim-terrace`,
        { terraceId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, message: response.data.message || "Enhorabona! Ara ets el propietari d'aquesta terraza!" };

    } catch (error: any) {

      if (error.response) {
        // El servidor respondió con un estado de error
        return { success: false, message: error.response.data.message || "Error del servidor al confirmar la propiedad." };
      
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        return { success: false, message: "No se pudo conectar con el servidor para confirmar la propiedad." };
      
      } else {
        // Algo más causó el error
        return { success: false, message: "Ha ocurrido un error inesperado al confirmar la propiedad." };
      }
    }
  },
};