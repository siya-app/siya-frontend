import { useEffect, useState } from "react";
import { UserLocationContext, type Location } from "./UserLocationContext";

export const UserLocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

    const defaultLocation: Location = {
    latitude: 41.3856,
    longitude: 2.1706,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
        setError(null); 
      },
      (err) => {
        console.warn("Error getting location; using default location", err);
        setLocation(defaultLocation)
        setLoading(false);
      }
    );
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, error, loading }}>
      {children}
    </UserLocationContext.Provider>
  );
};