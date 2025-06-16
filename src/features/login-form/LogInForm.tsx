import { useState } from 'react';
import API from '../../services/apiUser';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password_hash, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password_hash });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      console.log(123,  res.data.user)
      navigate('/perfil');
    } catch (err) {
      setError(err.response?.data?.error || "No s'ha pogut iniciar sessió");
    }
  };

  return (
    <>
    <form onSubmit={login}
    className='flex flex-col w-4/5 m-auto'>
        <h3>Accedir →</h3>
        <label htmlFor="email"
        className='mt-4'>Email</label>
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          className='w-1/2 mt-2'
        />
        <label htmlFor="contrasenya"
        className='mt-4'>Contrasenya</label>
        <input 
          type="password" 
          name="contrasenya"
          placeholder="Password" 
          value={password_hash} 
          onChange={e => setPassword(e.target.value)} 
          required 
          className='w-1/2 mt-2'
        />
        <div className='mt-4 flex justify-between w-1/2'>
        <Button
        type="submit"
        className="bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer"
        >
            Inicia sessió
        </Button>
        
        <Button 
        className= "text-siya-dark-green underline py-2 px-4 bg-white cursor-pointer"
        >Registra't</Button>
        </div>
        {error && <p className="text-siya-principal">{error}</p>}

    </form>
    </>
  )
}
