import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchTerraceById } from "../services/fetchTerraceById";
import type { Terrace } from '../types/TerraceType';





function CalendarBooking() {
   const { restaurantId } = useParams();
  const location = useLocation();
  const userData = location.state?.userData;

  const [terrace, setTerrace] = useState<Terrace | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(terrace);
  
  useEffect(() => {
    if (!restaurantId) return;

    fetchTerraceById(restaurantId)
      .then((data) => setTerrace(data))
      .catch((err) => console.error("Error al cargar la terraza:", err))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  if (loading) return <p>Carregant dades del restaurant...</p>;
  if (!terrace) return <p className="text-red-500">No s'ha trobat la terrassa.</p>;

  return (
    <div>
      <h2>
        Estàs en el restaurant: <strong>{terrace.business_name}</strong>
      </h2>
      <img src={terrace.profile_pic} alt="terrace-picture"  style={{width:"200px"}}/>
      <p>Direcció: {terrace.address}</p>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </div>
  );
}

export default CalendarBooking
