import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import caLocale from '@fullcalendar/core/locales/ca';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTerraceById } from '../services/fetchTerraceById';
import type { Terrace } from '../types/TerraceType';
import { FaMapMarkerAlt } from 'react-icons/fa';


function CalendarBooking() {
  const { restaurantId } = useParams();
  // const location = useLocation();
  // const userData = location.state?.userData;

  const [terrace, setTerrace] = useState<Terrace | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    fetchTerraceById(restaurantId)
      .then((data) => setTerrace(data))
      .catch((err) => console.error("Error al cargar la terraza:", err))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  const handleDateClick = (arg:any) => {
    setSelectedDate(arg.dateStr);
    setShowModal(true);
  };

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
        />

        {showModal && (
          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Confirmar Reserva</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const hour = form['hour'].value;
                  const people = form['people'].value;
                  const accepted = form['terms'].checked;

                  if (!accepted) {
                    alert("Has d'acceptar els termes.");
                    return;
                  }

                  const title = `${people} persona(es) a les ${hour}`;
                  setEvents((prev) => [
                    ...prev,
                    {
                      title,
                      start: `${selectedDate}T${hour}`,
                      allDay: false,
                    },
                  ]);
                  setShowModal(false);
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
