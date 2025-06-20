import { useEffect, useState } from 'react';
import React from 'react';
import API from '../services/apiUser';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TerraceClaim from '../features/terrace-claim/TerraceClaim';
import TerraceSlider from '../components/slider/TerraceSlider';
import { useTerraceList } from '../hooks/useTerraceList';
import Button from '../components/Button';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { terraceList } = useTerraceList();
  const [openSection, setOpenSection] = useState<boolean>(false);


  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token')
    console.log(storedUser);

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    } else {

      navigate('/login');
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return <p>Carregant dades de l'usuari...</p>;


  return (
    <>
      <div className="w-fit mx-auto p-6 bg-white shadow-lg rounded-lg m-3 ms-5 me-5 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-siya-dark-green">
          Hola, {user.name}!
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
      <TerraceSlider
        list={terraceList}
        orderBy={"nearby"}
      />
      <div
        onClick={() => setOpenSection(prev => !prev)}
        className="cursor-pointer collapse-title
        text-primary-content px-4 py-2
        m-4 bg-siya-terciario
        flex justify-between items-center
        toggle-height
        rounded
        "
      >
        <h3 className="text-xl m-2">Ets propietari d'una terrassa?</h3>
        {openSection ? (
          <FaChevronUp className="siyaDark-text" />
        ) : (
          <FaChevronDown className="siyaDark-text" />
        )}
      </div>
      <div
  className={`toggle-height transition-all duration-600 ${openSection ? 'max-h-[1000px]' : 'max-h-0'}`}
>
  <div className="p-4">
    <TerraceClaim />
  </div>
</div>
<div className='flex justify-center m-5'>
  <Button
  onClick={handleLogout}
  className={`border-2 border-siya-principal rounded-xl p-2 text-siya-principal w-fit`}
  >Log out</Button>
</div>
    </>
  )
}

