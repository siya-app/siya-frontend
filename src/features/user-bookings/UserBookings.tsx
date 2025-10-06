import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../../components/BookingCard";
import BookingsModal from "../../components/BookingsModal";

interface Booking {
  id: number;
  booking_date: string;
  booking_time: string;
  Terrace: {
    business_name: string;
    address: string;
  };
}

interface MyBookingsProps {
  userId: number;
}

const MyBookings: React.FC<MyBookingsProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_USER_BOOKINGS}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data);
      } catch (err) {
        setError("Error carregant les reserves.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const firstTwoBookings = bookings.slice(0, 2);
  return (
    <>
      <div className="max-w-3xl mx-auto mt-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-gray-500">Carregant reserves...</p>
        ) : bookings.length === 0 ? (
          <p className="">Encara no has fet cap reserva.</p>
        ) : (
          firstTwoBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              terraceName={booking.Terrace.business_name}
              terraceAddress={booking.Terrace.address}
              date={new Date(booking.booking_date).toLocaleDateString()}
              time={booking.booking_time}
            />
          ))
        )}
        {bookings.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer w-fit"
            >
              Veure totes les meves reserves
            </button>
          </div>
        )}
      </div>
      <BookingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookings={bookings}
      />
    </>
  );
};

export default MyBookings;
