import { useEffect, useState } from 'react';
import React from 'react';
import API from '../services/apiUser';
import { useNavigate } from 'react-router-dom';

interface UserProfile {

name: string;
email: string;
birth_date: string;
//terraces: string;
// favs: string;
// reviews: string;
}

function UserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Resetea estados al iniciar la carga
    setError('');
    setIsLoading(true);

   
    API.get<UserProfile>('/me') 
      .then(res => {
        setUser(res.data); 
        setIsLoading(false);
      })
      .catch(err => {
        
        if (err.response) {
          
          if (err.response.status === 401 || err.response.status === 403) {
            setError('No autoritzat. Si us plau, torna a iniciar sessió.');
            localStorage.removeItem('authToken'); 
            navigate('/');  
          } else if (err.response.data && err.response.data.message) {
            setError(`Error: ${err.response.data.message}`);
          } else {
            setError('Error al carregar el perfil. Torna a intentar-ho més tard.');
          }
        } else if (err.request) {
          
          setError("No s'ha pogut connectar amb el servidor. Comprova la teva connexió.");
        } else {
          
          setError(`Error: ${err.message}`);
        }
        setIsLoading(false);
      });
  }, [navigate]);
  
  if (isLoading) {
    return <p>Carrgant perfil...</p>;
  }
  if (error) {
    return (
      <div className="text-red-600 text-center mt-8">
        <p>{error}</p>
      </div>
    );
  }
    if (!user) {
    return <p>No s'ha trobat cap usuari amb les dades proporcionades.</p>;
  }

  return (
    <>
      return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-siya-dark-green">
        Hola, {user.name}!
      </h2>
      <div className="space-y-3 text-gray-700">
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
    </>
  )
}

export default UserProfile