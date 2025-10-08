import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../services/apiCatastro";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";

type TerraceClaimProps = {
  onClaimSuccess?: (user: any) => void; // puedes tipar bien con tu User
};

function TerraceClaim({ onClaimSuccess }: TerraceClaimProps) {
  const [catastro, setCatastro] = useState("");
  const [error, setError] = useState("");
  const [foundTerrace, setFoundTerrace] = useState<CustomTerraceType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const getUserIdFromLocalStorage = (): string | null => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        return user.id as string;
      }
    } catch (e) {
      console.error("Error parsing user data from localStorage:", e);
      return null;
    }
    return null;
  };

  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    if (userId) {
      setCurrentUserId(userId);
    } else {
      setError("Has d'iniciar sessió per reclamar una terrassa.");
    }
  }, []);

  const claimTerrace = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFoundTerrace(null);
    setConfirmationMessage("");
    setLoading(true);

    if (!currentUserId) {
      setError(
        "No s'ha pogut obtenir l'ID de l'usuari actual. Si us plau, assegura't d'iniciar sessió."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await api.findTerraceByCatastro(catastro);

      if (response.success) {
        setFoundTerrace(response.terrace);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Error al buscar la terrassa:", err);
      setError(
        "Hi ha hagut un error al buscar la terrassa. Torna a intentar-ho més tard."
      );
    } finally {
      setLoading(false);
    }
  };

  const confirmTerraceOwnership = async () => {
    setLoading(true);
    setError("");
    setConfirmationMessage("");

    if (!currentUserId) {
      setError(
        "No s'ha pogut obtenir l'ID de l'usuari actual. Si us plau, inicia sessió de nou."
      );
      setLoading(false);
      return;
    }

    if (!foundTerrace) {
      setError("No hi ha cap terrassa seleciionada per confirmar.");
      setLoading(false);
      return;
    }

  
    try {
      const response = await api.updateUserRoleAndTerrace(
        currentUserId,
        foundTerrace.id!
      );

      if (response.success) {
        setConfirmationMessage(response.message);
        setFoundTerrace(null);
        setCatastro("");

        const userString = localStorage.getItem("user");
        let updatedUserData;

        if (userString) {
          try {
            const currentUserData = JSON.parse(userString);
            updatedUserData = {
              ...currentUserData,
              role: "owner",
              id_terrace: foundTerrace.id,
            };
            localStorage.setItem("user", JSON.stringify(updatedUserData));
          } catch (e) {
            console.error("Error al actualitzar usuari:", e);
          }
        }

        // 🔑 Avisamos al padre que hay un nuevo user
        if (onClaimSuccess && updatedUserData) {
          onClaimSuccess(updatedUserData);
        }
      } else {
        setError(response.message);
      }
    }
    
    
    catch (err) {
      console.error("Error al confirmar la propietat de la terrassa:", err);
      setError(
        "Hi ha hagut un error al confirmar la propietat. Torna a intentar-ho més tard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={claimTerrace}
        className="flex flex-col w-4/5 items-center  m-auto"
      >
        <h4 className="text-center mb-4">
          Per reclamar-la, introdueix la referència catastral del teu
          establiment a la casella següent:
        </h4>
        <input
          type="text"
          placeholder="Número catastral"
          value={catastro}
          onChange={(e) => setCatastro(e.target.value)}
          required
          className="w-3/4 mt-2 border-1 border-siya-dark-green p-2 rounded m-2 ms-0"
          disabled={loading || !currentUserId} // Deshabilitar si carga o no hay usuario
        />
        <button
          type="submit"
          className="w-3/4
          bg-siya-dark-green
                text-siya-lemon-cream
                font-bold
                py-2
                px-4
                rounded
                cursor-pointer"
          disabled={loading || !currentUserId} // Deshabilitar si carga o no hay usuario
        >
          {loading ? "Cercant..." : "Cercar terrassa"}
        </button>

        {error && (
          <>
            <p className="text-siya-principal mt-4">{error}</p>
            {error && (
              <p className="text-siya-secundario">
                Si no trobes la teva terrassa, contacta'ns perquè la registrem a
                la nostra base de dades
              </p>
            )}
          </>
        )}

        {foundTerrace && (
          <div className="mt-6 p-4 border border-gray-300 rounded">
            <h4 className="font-bold">Terrassa Trobada:</h4>
            <p>
              <strong>Nom:</strong> {foundTerrace.business_name}
            </p>
            <p>
              <strong>Adreça:</strong> {foundTerrace.address}
            </p>
            <p className="mt-2">És aquesta la teva terrassa?</p>
            <button
              type="button"
              onClick={confirmTerraceOwnership}
              className="w-fit 
                bg-siya-dark-green
                text-siya-lemon-cream
                font-bold
                py-2
                px-4
                rounded
                cursor-pointer
                mt-2
                "
              disabled={loading}
            >
              {loading ? "Confirmant..." : "Aquesta mateixa :)"}
            </button>
          </div>
        )}

        {confirmationMessage && (
          <p className="text-green-600 mt-4 font-bold">{confirmationMessage}</p>
        )}
      </form>
    </>
  );
}

export default TerraceClaim;
