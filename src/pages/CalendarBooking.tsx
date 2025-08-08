import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import caLocale from '@fullcalendar/core/locales/ca';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTerraceById } from '../services/fetchTerraceById';
import type { Terrace } from '../types/TerraceType';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { fetchWeather } from '../services/fetchWeather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain
} from "lucide-react";
import { createBooking } from '../services/booking-service/booking.service';
import type { BackendBooking, BookingCreateDTO } from '../interfaces/booking-interface/bookingInterface';






function CalendarBooking() {
  const { restaurantId } = useParams();
  // const location = useLocation();
  // const userData = location.state?.userData;

  const [terrace, setTerrace] = useState<Terrace | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [weather, setWeather] = useState<any | null>(null);
  // console.log(terrace);

  const token = localStorage.getItem('token') || '';
const userId = localStorage.getItem('user_id') || '';
console.log(userId);


  useEffect(() => {
    if (!restaurantId) return;
    fetchTerraceById(restaurantId)
      .then((data) => setTerrace(data))
      .catch((err) => console.error("Error al cargar la terraza:", err))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  const handleDateClick = async (arg:any) => {
    setSelectedDate(arg.dateStr);
    setShowModal(true);



    if(terrace?.latitude && terrace?.longitude) {
      try {
      const weatherData= await fetchWeather({
        latitude: terrace.latitude,
      longitude: terrace.longitude
    }, arg.dateStr
  )
      setWeather(weatherData);
//       console.log("Fechas de la API:", weatherData.hourly.time.slice(0, 24));
// console.log("Fecha seleccionada:", arg.dateStr);
    } catch (error){
      console.error("No s'ha pogut obtenir el temps", error)
    }
  }
  };

  function getAverageTemperatureForDate(weather: any, date: string): number | null {
  if (!weather?.hourly) return null;

  const temps: number[] = [];
  const timeArray = weather.hourly.time;
  const tempArray = weather.hourly.temperature_2m;

  for (let i = 0; i < timeArray.length; i++) {
    if (timeArray[i].startsWith(date)) {
      temps.push(tempArray[i]);
    }
  }

  if (temps.length === 0) return null;

  const sum = temps.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / temps.length).toFixed(1));
}

function getWeatherIcon(cloudCover: number | null) {
  if (cloudCover === null) return <Cloud className="w-5 h-5 siyaRed-text " />; 
  if (cloudCover < 20) return <Sun className="w-5 h-5 siyaRed-text" />;
  if (cloudCover < 50) return <CloudSun className="w-5 h-5 siyaRed-text" />;
  if (cloudCover < 80) return <Cloud className="w-5 h-5 siyaRed-text"  />;
  return <CloudRain className="w-5 h-5 siyaRed-text"  />;
}

function getAverageCloudCoverForDate(weather: any, date: string): number | null {
  if (!weather?.hourly) return null;

  const cloudCovers: number[] = [];
  const timeArray = weather.hourly.time;
  const cloudCoverArray = weather.hourly.cloud_cover; 

  for (let i = 0; i < timeArray.length; i++) {
    if (timeArray[i].startsWith(date)) {
      cloudCovers.push(cloudCoverArray[i]);
    }
  }

  if (cloudCovers.length === 0) return null;

  const sum = cloudCovers.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / cloudCovers.length);
}


  function generateHourOptions() {
    const hours = [];
    for (let h = 9; h <= 22; h++) {
      const hourStr = h.toString().padStart(2, '0');
      hours.push(`${hourStr}:00`);
      // hours.push(`${hourStr}:30`);
    }
    return hours.map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ));
  }

  if (loading) return <p>Carregant dades del restaurant...</p>;
  if (!terrace) return <p className="text-red-500">No s'ha trobat la terrassa.</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-8">
      <div className="relative">
        <img
          src={terrace.profile_pic}
          alt="terrace"
          className="w-full h-48 object-cover bg-gray-100 p-2 rounded"
        />
        <button
          className="absolute bottom-7 left-5 bg-white text-sm px-3 py-1 rounded-full shadow"
          style={{ color: '#ff1818' }}
        >
          Veure concurrència
        </button>
      </div>

      <div className="p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-1" style={{ color: '#ff1818' }}>
          {terrace.business_name}
        </h2>
        <p className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2 text-gray-500" />
          {terrace.address}
        </p>
      </div>

      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          locales={[caLocale]}
          locale="ca"
          dateClick={handleDateClick}
          events={events}
           validRange={{
    start: new Date().toISOString().split("T")[0],
    end: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]
  }}
        />

        {showModal && (
          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Confirmar Reserva</h2>

             {weather?.hourly && selectedDate &&  (
 <div className="mb-4 text-sm bg-gray-50 p-3 rounded">

    <p className="flex items-center whitespace-nowrap"><strong>Previsió pel dia {selectedDate}{" "}</strong>  <FontAwesomeIcon icon={faArrowRight} className="mx-2"/> <span style={{color:"#ff1818"}} className="flex items-center gap-1 "><strong>{getAverageTemperatureForDate(weather, selectedDate)}°C</strong>{weather.hourly.cloud_cover && getWeatherIcon(getAverageCloudCoverForDate(weather, selectedDate))}</span></p>
    
  </div>
)}

              <form
                 onSubmit={async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const hour = form['hour'].value;
    const people = parseInt(form['people'].value, 10);
    const accepted = form['terms'].checked;

    if (!accepted) {
      alert("Has d'acceptar els termes.");
      return;
    }

    if (!terrace || !selectedDate) {
      alert("Falten dades per a la reserva.");
      return;
    }

    try {
      const bookingData:BookingCreateDTO = {
        booking_date: selectedDate,          // "2025-08-08"
  booking_time: hour,          // "15:00"
  is_paid: false,                       // obligatorio
  party_length: Number(people),         // obligatorio
  booking_price: Number(people) * 1,    // opcional (el backend lo calcula igual)
  user_id: userId,                      // UUID válido del usuario
  terrace_id: terrace.id    
      };

      const newBooking = await createBooking(bookingData as BackendBooking, token);

      // Añadir visualmente al calendario
      setEvents((prev) => [
        ...prev,
        {
          title: `${people} persona(es) a les ${hour}`,
          start: `${selectedDate}T${hour}`,
          allDay: false,
        },
      ]);

      alert("Reserva creada correctament!");
      setShowModal(false);

    } catch (error: any) {
      console.error('Error backend:', error);
      alert(error.message || "Error al crear la reserva");
    }
  }}
              >
                <label className="block text-sm mb-1">Fecha:</label>
                <input
                  type="text"
                  value={selectedDate ?? ''}
                  readOnly
                  className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
                />

                <label className="block text-sm mb-">Hora:</label>
                <select name="hour" className="w-full border rounded px-3 py-2 mb-3"   required>
                  {generateHourOptions()}
                </select>

                <label className="block text-sm mb-1">Quantes persones?</label>
                <input
                  type="number"
                  name="people"
                  defaultValue={1}
                  min={1}
                  className="w-full border rounded px-3 py-2 mb-3"
                  required
                />

                <label className="inline-flex items-center mb-4">
                  <input type="checkbox" name="terms" className="mr-2" style={{accentColor:"#385852"}}/>
                  Accepto els termes i condicions
                </label>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="cancel-btn bg-gray-200 px-4 py-2 rounded-3xl "
                    
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="confirm-btn text-white px-4 py-2 rounded-3xl" >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarBooking;
