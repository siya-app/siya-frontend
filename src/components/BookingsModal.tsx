import React from "react";
import BookingCard from "./BookingCard";

interface Booking {
  id: number;
  booking_date: string;
  booking_time: string;
  Terrace: {
    business_name: string;
    address: string;
  };
}

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
}

const BookingsModal: React.FC<BookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto relative overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Totes les meves reserves
        </h3>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              terraceName={booking.Terrace.business_name}
              terraceAddress={booking.Terrace.address}
              date={new Date(booking.booking_date).toLocaleDateString()}
              time={booking.booking_time}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer"
        >
          Tancar
        </button>
      </div>
    </div>
  );
};

export default BookingsModal;
