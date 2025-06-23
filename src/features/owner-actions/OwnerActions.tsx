import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TerraceClaim from "../terrace-claim/TerraceClaim";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function OwnerActions() {
  const [user, setUser] = useState<any>(null);
  const [openSection, setOpenSection] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);

  const goToOwnedTerrace = () => {
    if (!user || !user.id) return;
    //ruta a angular
    window.location.href = `http://localhost:4200/profile/${user.id}`;
  };

  if (!user) return <p>Carregant dades d'usuari...</p>;
  return (
    <>
      {user.role === "owner" && (
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            onClick={goToOwnedTerrace}
            className="bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer"
          >
            Veure la meva terrassa
          </Button>
          {/* Aquí van otros dos botones de editar y darse de baja */}
        </div>
      )}
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
