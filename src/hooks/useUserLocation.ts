// hooks/useUserLocation.ts
import { useContext } from "react";
import { UserLocationContext } from "../context/UserLocationContext";

export const useUserLocation = () => {
  const context = useContext(UserLocationContext);

  if (context === undefined) {
    throw new Error("useUserLocation must be used within a UserLocationProvider");
  }

  return context;
};
