import { useEffect, useState } from "react";
import { fetchTerraces } from "../../services/fetchTerraces";
import { type Terrace } from "../../types/TerraceType";

const TerraceList = () => {
  const [terraces, setTerraces] = useState<Terrace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTerraces = async () => {
      try {
        const data = await fetchTerraces();
        setTerraces(data.filter((terrace) => terrace.id !== undefined) as Terrace[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    getTerraces();
  }, []);

  if (loading) return <p>Carregant terrasses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {terraces.map((terrace) => (
        <div key={terrace.id} className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">{terrace.business_name}</h3>
          <p className="text-gray-500">{terrace.address}</p>
        </div>
      ))}
    </div>
  );
};

export default TerraceList;
