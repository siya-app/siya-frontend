import { createContext } from "react";

export type Location = {
  latitude: number;
  longitude: number;
};

export type UserLocationContextType = {
  location: Location | null;
  error: string | null;
  loading: boolean;
};

export const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);
