import React from "react";

interface BookingCardProps {
  terraceName: string;
  terraceAddress: string;
  date: string;       
  time: string;        
}

const BookingCard: React.FC<BookingCardProps> = ({ terraceName, terraceAddress, date, time }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 text-center">
      <h3 className="text-xl font-semibold text-siya-principal mb-2">
        {terraceName}
      </h3>
      <p className="text-gray-600 text-sm">{terraceAddress}</p>
      <div className="mt-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Data:</span> {date}
        </p>
        <p>
          <span className="font-semibold">Hora:</span> {time}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
