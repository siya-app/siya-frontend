export interface TerraceInfo {
  profile_pic: string | null;
  id: string;
  business_name: string;
  address: string;
  tables: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface BackendBooking {
  id: string;
  booking_date: string;
  booking_time: string;
  party_length: number;
  booking_price: number;
  user_id: string;
  terrace_id: string;
  is_paid: boolean;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingCreateDTO = Omit<BackendBooking, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

export interface User {
  id: string;
  name: string;
  email: string;
  id_terrace: string | null;
}

export interface Terrace {
  id: string;
  business_name: string;
  address: string;
}

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
