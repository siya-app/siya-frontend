import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import type { Terrace } from "../../types/TerraceType";
import { fetchTerraceById } from "../../services/fetchTerraceById";
import { ReviewForm } from "../reviews/ReviewForm";
// import CategoryBlobs from "../components/CategoryBlobs"; // si existeix
import { useQueryClient } from '@tanstack/react-query';
import {useAuth} from "../../context/useAuth"; // hook per obtenir l'usuari autenticat

const TerraceDetailsView = () => {
  const { id } = useParams(); // id de la URL
  const [terrace, setTerrace] = useState<Terrace | null>(null);
  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();
  const user = useAuth();

  useEffect(() => {
    if (!id) return;

    fetchTerraceById(id)
      .then((data) => setTerrace(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Carregant terrassa...</p>;
  if (!terrace) return <p className="p-4 text-red-500">No s'ha trobat la terrassa.</p>;

  return (
    <div className="p-4 space-y-3">
      <img
        src={terrace.profile_pic}
        alt={terrace.business_name}
        className="rounded-lg w-full object-cover h-52"
      />

      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold text-siya-principal leading-tight">
          {terrace.business_name.split(" ")[0]} <br />
          {terrace.business_name.split(" ").slice(1).join(" ")}
        </h1>
        <div className="text-right text-siya-dark-green">
          <div className="text-2xl">⭐ {terrace.average_rating}/10</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-700">
        <span>📍</span>
        <span>{terrace.address}</span>
      </div>

      {/* Blobs, accions, ressenyes... */}
      <div className="flex justify-around pt-4">
        <div className="flex flex-col items-center">
          <Heart className="w-6 h-6" />
          <span className="text-sm">Guardar</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="w-6 h-6" />
          <span className="text-sm">Compartir</span>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium">Ressenyes</h2>
          <span className="text-xl">➡️</span>
        </div>
      </div>
      <ReviewForm
        userId={user.user?.id || ''}
        terraceId={terrace.id}
        onSuccess={() => {
          // p. ex. tornar a carregar reviews
          queryClient.invalidateQueries({ queryKey: ['reviews', terrace.id] });
        }}
      />
      <div className="flex justify-end pr-3 pt-4">
        <button className="text-sm text-gray-500">➕ Afegir Ressenya</button>
      </div>
    </div>
  );
};

export default TerraceDetailsView;