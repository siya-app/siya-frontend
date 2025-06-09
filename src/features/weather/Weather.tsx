import { useEffect, useState } from "react";
import {fetchWeather}  from "../../services/fetchWeather";
import { Cloud, Sun, CloudSun } from "lucide-react";

type WeatherData = {
  current: { cloud_cover: number };
  hourly: { temperature_2m: number[]; time: string[] };
};

const FetchWeather = () => {
  const [weather, setWeather] = useState<null | WeatherData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather();
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
  }, []);

  if (loading) return <p>Carregant el temps...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  const cloudCover = weather.current.cloud_cover;
  const temperature = weather.hourly.temperature_2m[0];


  let icon = <Sun className="w-12 h-12 text-yellow-400" />;
  let description = "Cel clar";

  if (cloudCover > 30 && cloudCover <= 70) {
    icon = <CloudSun className="w-12 h-12 text-yellow-300" />;
    description = "Parcialment ennuvolat";
  } else if (cloudCover > 70) {
    icon = <Cloud className="w-12 h-12 text-gray-500" />;
    description = "Molt ennuvolat";
  }

  return (
    <div >
      <div className="flex items-center">
        {icon}
      </div>
      <span >{description}</span>
      <p className="text-sm">🌡️ {temperature}°C</p>
    </div>
  );
};

export default FetchWeather;
