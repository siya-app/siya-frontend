import { useEffect, useState} from "react";
import API from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import Button from "../components/Button";
import DeleteAccount from "../features/delete-account/DeleteAccount";
import UpdateAccount from "../features/update-account/UpdateAccount";
import OwnerActions from "../features/owner-actions/OwnerActions";
import UserReviews from "../features/user-reviews/UserReviews";



export default function Profile() {
    const navigate = useNavigate();
  const { terraceList } = useTerraceList();

  const [user, setUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };


  if (!user) return <p>Carregant dades de l'usuari...</p>;

  return (
    <>
      <div className="w-fit mx-auto p-6 bg-white shadow-lg rounded-lg m-3 ms-5 me-5 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-siya-dark-green">
          Hola, {user.name}!
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
      
      <Button
        onClick={() => navigate("/buscar-terrassa")}
        className="text-primary-content px-4 py-2 mt-8 m-4 bg-siya-principal text-white rounded-full flex justify-between items-center toggle-height mx-auto"
      >
        Reservar taula
      </Button>

      <TerraceSlider list={terraceList} orderBy={"nearby"} />
      <OwnerActions />

      <div className="m-auto w-fit mb-4">
        <Button
          onClick={() => setShowEditModal(true)}
          className="border-2 border-siya-principal rounded-xl p-2 text-siya-principal w-fit"
        >
          Editar perfil
        </Button>
      </div>

      <div className="m-auto w-fit">
        <Button
          onClick={() => setShowModal(true)}
          className="border-2 border-siya-principal rounded-xl p-2 bg-siya-principal text-white"
        >
          Eliminar compte
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
    </>
  );
}