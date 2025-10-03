import type { BackendBooking } from '../../interfaces/booking-interface/bookingInterface';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createBooking = async (
  bookingData: BackendBooking,
  token: string
): Promise<BackendBooking> => {
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
    console.error('Backend error data:', errorData);
    throw new Error(errorData.message || 'Error al crear la reserva');
  }

  return await response.json();
};
