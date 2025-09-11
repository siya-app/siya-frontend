import { useEffect, useState } from "react";
import { fetchWeather } from "../../services/fetchWeather";
import { Cloud, Sun, CloudSun } from "lucide-react";
import { useUserLocation } from "../../hooks/useUserLocation";

type WeatherData = {
  current: { cloud_cover: number };
  hourly: { temperature_2m: number[]; time: string[] };
};

const WeatherFeature = () => {
  const [weather, setWeather] = useState<null | WeatherData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { location, loading: locationLoading, error: locationError } = useUserLocation();

  useEffect(() => {
    const getWeather = async () => {
      if (!location) return;

      try {
        const data = await fetchWeather(location);
        if ("current" in data && "hourly" in data) {
          setWeather(data as WeatherData);
        } else {
          setError("No s'han trobat dades de temps.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("S'ha produït un error desconegut.");
        }
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [location]);

  if (locationLoading || loading) return <p>Carregant el temps...</p>;
  if (locationError || error) return <p>{locationError || error}</p>;
  if (!weather) return null;

  const cloudCover = weather.current.cloud_cover;
  const temperature = weather.hourly.temperature_2m[0];

  let icon = <Sun className="w-12 h-12 text-yellow-400" />;

  if (cloudCover > 30 && cloudCover <= 70) {
    icon = <CloudSun className="w-12 h-12 text-yellow-300" />;

  } else if (cloudCover > 70) {
    icon = <Cloud className="w-12 h-12 text-gray-500" />;

  } else {
    icon;
  }

  return (

    <div className="
      bg-gradient-to-br from-white/50 to-neutral-300/30
      backdrop-blur-xs
      border border-white/30
      flex flex-col items-center
      bg-
      w-full max-w-xs
      p-3
      rounded-full
    ">
      <div className="flex items-center w-3/4">
        {icon}
      </div>
      <span className="text-sm text-gray-800 font-medium">
        {/* {description} */}
      </span>
      <p className="text-sm font-semibold text-gray-900">
        {temperature}°C
      </p>
    </div>
  );
};

export default WeatherFeature;