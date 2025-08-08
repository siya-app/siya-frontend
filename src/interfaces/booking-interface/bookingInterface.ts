export interface Booking {
  id: string;
  booking_date: string; // formato, año mes dia
  booking_time: string;
  user_id: string;
  clientName?: string;
  is_paid?: boolean;
  party_length?: number;
  booking_price?: number;
  has_shown?: boolean;
}

export interface BookingRequest {
  date: string;
  time: string;
}
