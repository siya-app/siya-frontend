import type { Booking } from '../../interfaces/booking-interface/bookingInterface';

const API_BASE_URL = 'http://localhost:8080';

export const createBooking = async (
  bookingData: Booking,
  token: string
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear la reserva');
  }

  return response.json();
};