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
import redBlob from '../../assets/blobs/red-blob.png'

function OwnerActions() {
  const [user, setUser] = useState<User | null>(null);
  const [openSection, setOpenSection] = useState(false);
  const [ownedTerrace, setOwnedTerrace] = useState<CustomTerraceType| null>(null)
  const navigate = useNavigate();

  const {allTerraces, error, getTerraces, claimedTerraces} = useContext(TerraceContext)!
  const {getUsers, allUsers, owners, userError} = useContext(UserContext)!

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    getTerraces();
    getUsers();

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);
 
  useEffect(() => {
    if (user) {
      console.log("User ID:", user.id);
      const owner = owners.find(owner => owner.id === user.id);
      console.log("Owner found:", owner);
      console.log("Claimed Terraces: ", claimedTerraces);
      
      if (owner) {
        const foundTerrace = claimedTerraces.find(terrace => terrace.id === owner.id_terrace);
        setOwnedTerrace(foundTerrace)
        console.log("Owned terrace: ", ownedTerrace);
      }
    }
      
  }, [user, owners, claimedTerraces, ownedTerrace]);

  
  
  const goToOwnedTerrace = () => {
    if (!user || !user.id) return;
    //ruta a angular
    window.location.href = `http://localhost:4200/profile/${user.id}`;
  };

  if (!user) return <p>Carregant dades de l'usuari...</p>;
  return (
    <>
      {user.role === "owner" &&  ownedTerrace && ( <>
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
                                        id={ownedTerrace.id}
                                    />
            </div>
            <div className="flex flex-col md:flex-row gap-4 m-3">
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
            Veure la meva terrassa
          </Button>
          {/* Aquí van otros dos botones de editar y darse de baja */}
        </div>
      </>)}
      {user.role === "client" &&( <>
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
                className={`toggle-height transition-all duration-600 ${
                  openSection ? "max-h-[1000px]" : "max-h-0"
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
