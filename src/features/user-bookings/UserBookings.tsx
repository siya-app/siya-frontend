import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowSmRight } from "react-icons/hi";

interface Booking {
  id: number;
  booking_date: string;
  booking_time: string;
  Terrace: {
    name: string;
    address: string;
  };
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_USER_BOOKINGS);
        setBookings(response.data);
      } catch (err) {
        setError("Error carregant les reserves.");
        console.error(err, bookings);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-gray-500">Carregant reserves...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto  mt-4">
      <h2
                className="montserrat-siya text-xl
                  m-2 ms-3 siyaDark-text"
              >
                Les meves reserves
                <span className="inline-icon">
                  <HiArrowSmRight />
                </span>
              </h2>
      {/* {bookings.length === 0 ? (
        <p className="">Encara no has fet cap reserva.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            terraceName={booking.Terrace.name}
            terraceAddress={booking.Terrace.address}
            date={new Date(booking.booking_date).toLocaleDateString()}
            time={booking.booking_time}
          />
        ))
      )} */}
      <p className="m-auto text-center">Encara no has fet cap reserva</p>
    </div>
  );
};

export default MyBookings;
