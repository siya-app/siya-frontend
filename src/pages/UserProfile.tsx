import { useEffect, useState } from 'react';
import React from 'react';
import API from '../services/apiUser';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    const storedToken=localStorage.getItem('token')
    console.log(storedUser);
    
    if (storedUser) {
      
      setUser(JSON.parse(storedUser));
      
    } else {
     
      navigate('/');
    }
  }, []);

  

  if (!user) return <p>Carregant dades de l'usuari...</p>;


  return (
    <>
      
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
  
    </>
  )
}

