import { useEffect, useState } from "react";
import { UserLocationContext, type Location } from "./UserLocationContext";

export const UserLocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.error("Error getting location:", err);
        setError("Could not fetch location.");
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
