import { Heart, Share2 } from "lucide-react";
/* import  Button  from "../../components/Button";
 */
import { type Terrace } from "../../types/TerraceType";

type Props = {
  terrace: Terrace;
};

const TerraceDetailsView = ({ terrace }: Props) => {
  return (
    <div className="p-4 space-y-3">
      {/* Imatge */}
      <img
        src={terrace.profile_pic}
        alt={terrace.business_name}
        className="rounded-lg w-full object-cover h-52"
      />

      {/* Títol i rating */}
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold text-siya-principal leading-tight">
          {terrace.business_name.split(" ")[0]} <br />
          {terrace.business_name.split(" ").slice(1).join(" ")}
        </h1>
        <div className="text-right text-siya-dark-green">
          <div className="text-2xl">⭐ {terrace.average_rating}/10</div>
        </div>
      </div>

      {/* Adreça */}
      <div className="flex items-center gap-2 text-gray-700">
        <span>📍</span>
        <span>{terrace.address}</span>
      </div>
{/*  Falta: CategoryBlobs component per mostrar les categories 
      <CategoryBlobs
        dietary={terrace.dietary_restrictions}
        food={terrace.food_categories}
        placement={terrace.placement}
        emotions={terrace.emotional_tags}
      /> */}

      {/* Accions */}
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

      {/* <Button className="mx-auto block mt-3">Fer una Reserva</Button>
 */}
      {/* Ressenyes */}
      <div className="pt-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium">Ressenyes</h2>
          <span className="text-xl">➡️</span>
        </div>
        {/* <ReviewSlider terraceId={terrace.id} /> */}
      </div>

      <div className="flex justify-end pr-3 pt-4">
        <button className="text-sm text-gray-500">➕ Afegir Ressenya</button>
      </div>
    </div>
  );
};

export default TerraceDetailsView;
