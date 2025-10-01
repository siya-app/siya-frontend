import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TerraceClaim from "../terrace-claim/TerraceClaim";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TerraceContext } from "../../context/filteredTerraces.context";
import { UserContext } from "../../context/filteredUsers.context";
import type { User } from "../../types/User";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import { HiArrowSmRight } from "react-icons/hi";
import BlobCard from "../../components/slider/BlobCard";
import redBlob from '../../assets/blobs/red-blob.png';
import UpdateTerrace from "../update-terrace/UpdateTerrace";
import type { TerraceUpdatePayload } from "../../types/TerraceUpdatePayload";
import TerraceUnclaim from "../terrace-unclaim/TerraceUnclaim";

function OwnerActions() {
  const [user, setUser] = useState<User | null>(null);
  const [openSection, setOpenSection] = useState(false);
  const [isEditTerraceOpen, setIsEditTerraceOpen] = useState(false);
  const [isUnclaimModalOpen, setIsUnclaimModalOpen] = useState(false);
  const [ownedTerrace, setOwnedTerrace] = useState<CustomTerraceType | null>(null)
  const navigate = useNavigate();

  const { getTerraces, allTerraces } = useContext(TerraceContext)!
  const { getUsers,  allUsers } = useContext(UserContext)!



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // const storedToken = localStorage.getItem("token");

    getTerraces();
    getUsers();

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
    //newFunction()
  }, []);

useEffect(() => {
  if (user && allUsers.length > 0 && allTerraces.length > 0) {
    const currentUser = allUsers.find(u => u.id === user.id);
    if (currentUser) {
      const claimedTerrace = allTerraces.find(t => t.id === currentUser.id_terrace) as CustomTerraceType | undefined;
      setOwnedTerrace(claimedTerrace || null);
    }
  }
}, [user, allUsers, allTerraces]);






  const goToOwnedTerrace = () => {
    if (!user || !user.id) return;

    // navigate("/meva-terrassa")
    navigate(`/meva-terrassa/${user.id}`)
    //ruta a angular
    // window.location.href = `http://localhost:4200/profile/${user.id}`;
  };

  const handleUpdateTerrace = async (formData: TerraceUpdatePayload) => {
    try {
      const token = localStorage.getItem("token");
      const updateURL = `${import.meta.env.VITE_API_ALL_TERRACES}/${ownedTerrace?.id || ''}`;

      const response = await fetch(updateURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error updating terrace:", result.error || result.message);
        return;
      }


    } catch (err) {
      console.error("Network/server error while updating terrace:", err);
    }
  };


  if (!user) return <p>Carregant dades de l'usuari...</p>;

  return (
    <>
      {user.role === "owner" && ownedTerrace && (<>
        <div className="mt-5">
          <h2 className="montserrat-siya text-xl
            m-2 ms-3 siyaDark-text">La meva terrassa <span className="inline-icon"><HiArrowSmRight /></span></h2>
          <BlobCard
            key={ownedTerrace.cadastro_ref}
            className="snap-start shrink-0 w-[60%] sm:w-[35%] m-auto"
            picture={ownedTerrace.profile_pic ?? ""}
            businessName={ownedTerrace.business_name}
            rating={ownedTerrace.average_rating ?? 0}
            blob={redBlob}
            id={ownedTerrace.id ?? ""}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mx-auto my-4 text-center justify-center md:px-8 md:w-4/5">

          <Button
            onClick={goToOwnedTerrace}
            className="bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer w-fit"
          >
            Reserves a la meva terrassa
          </Button>

          <Button
            onClick={() => setIsEditTerraceOpen(true)}
            className="bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer w-fit"
          >
            Editar terrassa
          </Button>
          <Button
            onClick={() => setIsUnclaimModalOpen(true)}
            className="bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer w-fit"
          >
            Ja no soc propietari/ària
          </Button>
        </div>
        <UpdateTerrace terrace={ownedTerrace} isOpen={isEditTerraceOpen} onClose={() => setIsEditTerraceOpen(false)} onSubmit={handleUpdateTerrace} />
        <TerraceUnclaim
          isOpen={isUnclaimModalOpen}
          onClose={() => setIsUnclaimModalOpen(false)}
          onUnclaimSuccess={(updatedUser) => {
    setUser(updatedUser); 
  }}
        />

      </>)}

      {user.role === "client" && (<>
        <div
          onClick={() => setOpenSection((prev) => !prev)}
          className="cursor-pointer collapse-title text-primary-content px-4 py-2 m-4 bg-siya-terciario flex justify-between items-center toggle-height rounded"
        >
          <h3 id="claimTerrace" className="text-xl m-2">
            Ets propietari d'una terrassa?
          </h3>
          {openSection ? (
            <FaChevronUp className="siyaDark-text" />
          ) : (
            <FaChevronDown className="siyaDark-text" />
          )}
        </div>

        <div
          className={`toggle-height transition-all duration-600 ${openSection ? "max-h-[1000px]" : "max-h-0"
            }`}
        >
          <div className="p-4 mb-10">
            <TerraceClaim />
          </div>
        </div>
      </>)}
    </>
  );
}

export default OwnerActions;
