import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import Button from "../components/Button";
import DeleteAccount from "../features/delete-account/DeleteAccount";
import UpdateAccount from "../features/update-account/UpdateAccount";
import OwnerActions from "../features/owner-actions/OwnerActions";
import { ReviewSlider } from "../features/reviews/ReviewSlider";
import UserBookings from '../features/user-bookings/UserBookings'
import useFavorites from "../hooks/useFavorites";
import { HiArrowSmRight } from "react-icons/hi";


export default function Profile() {
  const navigate = useNavigate();
  const { terraceList } = useTerraceList();
  const { favorites } = useFavorites();

  const [user, setUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { isFavorite } = useFavorites();
  console.log(isFavorite)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al parsear el usuario del localStorage", error);
        navigate("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const foundFavorites = () => {
    const favs = terraceList.filter((t) => {
      return favorites.some((f) => t.id && t.id === f.id_terrace);
    });

    return favs;
  };

  const userFavs = foundFavorites();



  if (!user) return <p>Carregant dades de l'usuari...</p>;

  return (
    <>
      <div className="w-fit items-center mx-auto p-6 bg-white shadow-lg
      rounded-full mt-5 text-center mb-10">
        <h2 className="text-3xl font-bold text-center siyaRed-text">
          Hola, {user.name}!
        </h2>
        {/* <div className="space-y-3 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold siyaDark-text">Email:</span> {user.email}
          </p>
        </div> */}
      </div>
      <div>
        <UserBookings />
      </div>
      <Button
        onClick={() => navigate("/buscar-terrassa")}
        className="text-primary-content px-4 py-2 mt-8 m-4 bg-siya-principal text-white rounded-full
        flex justify-between items-center toggle-height mx-auto"
      >
        Reservar taula
      </Button>
      <h2 className="montserrat-siya text-xl m-2 mt-15 ms-3 siyaDark-text">
        Les meves ressenyes
        <span className="inline-icon">
          <HiArrowSmRight />{" "}
        </span>
      </h2>
      <div>
        <ReviewSlider userId={user.id} refresh={true} />
      </div>
      <div className="mt-15">
        {userFavs && userFavs.length > 0 ? (
          <TerraceSlider list={userFavs} orderBy={"favs"} />
        ) : ("Encara no tens favorits")
        }
        <TerraceSlider list={terraceList} orderBy={"nearby"} />
      </div>
      <div className="mt-10">
        <OwnerActions />
      </div>

      <div className="m-auto w-fit mb-4">
        <Button
          onClick={() => setShowEditModal(true)}
          className="border-2 border-siya-principal rounded-xl p-2 text-siya-principal w-fit"
        >
          Editar perfil
        </Button>
      </div>


      <UpdateAccount
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <DeleteAccount isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="flex justify-center m-5">
        <Button
          onClick={logout}
          className="border-2 border-siya-principal rounded-xl p-2 text-siya-principal w-fit"
        >
          Log out
        </Button>
      </div>
      <div className="m-auto w-fit mb-6">
        <Button
          onClick={() => setShowModal(true)}
          className="border-2 border-siya-principal rounded-xl p-2 bg-siya-principal text-white"
        >
          Eliminar compte
        </Button>
      </div>
    </>
  );
}