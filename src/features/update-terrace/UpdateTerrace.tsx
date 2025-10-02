import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import { FiInfo } from "react-icons/fi";
import type { TerraceUpdatePayload } from "../../types/TerraceUpdatePayload";

interface UpdateTerraceProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: TerraceUpdatePayload) => void;
  terrace: CustomTerraceType;
}

function UpdateTerrace({
  isOpen,
  onClose,
  onSubmit,
  terrace,
}: UpdateTerraceProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [averagePrice, setAveragePrice] = useState(terrace.average_price ?? 0);
  const [hasWifi, setHasWifi] = useState<boolean | null>(
    terrace.has_wifi ?? null
  );
  const [petFriendly, setPetFriendly] = useState<boolean | null>(
    terrace.pet_friendly ?? null
  );
  const [hasDisabledAccess, setHasDisabledAccess] = useState<boolean | null>(
    terrace.has_disabled_access ?? null
  );
  const [canSmoke, setCanSmoke] = useState<boolean | null>(
    terrace.can_smoke ?? null
  );
  const [reservationFee, setReservationFee] = useState(
    terrace?.reservation_fee || 0
  );
  const [tables, setTables] = useState(terrace?.tables || 0);
  const [seats, setSeats] = useState(terrace?.seats || 0);
  const [phoneNum, setPhoneNum] = useState(terrace?.phone_num || "");
  const [instagramAccount, setInstagramAccount] = useState(
    terrace?.instagram_account || ""
  );
  const [website, setWebsite] = useState(terrace?.website || "");
  const [profilePic, setProfilePic] = useState(terrace?.profile_pic || "");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setPassError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setPassError("");
  //   setIsVerifying(true);

  //   if (!currentPassword) {
  //     setPassError("Has d'introduir la contrasenya actual.");
  //     setIsVerifying(false);
  //     return;
  //   }
  //   const updatedData: TerraceUpdatePayload = {
  //     average_price: averagePrice,
  //     has_wifi: hasWifi,
  //     pet_friendly: petFriendly,
  //     can_smoke: canSmoke,
  //     has_disabled_access: hasDisabledAccess,
  //     reservation_fee: reservationFee,
  //     tables: tables,
  //     seats: seats,
  //     phone_num: phoneNum,
  //     instagram_account: instagramAccount,
  //     website,
  //     profile_pic: profilePic,
  //   };

  //   try {
  //     const token = localStorage.getItem("token");
  //     const verifyURL = import.meta.env.VITE_VERIFY_PASSWORD_URL;

  //     const res = await fetch(verifyURL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ password: currentPassword }),
  //     });

  //     const data = await res.json();

  //     if (res.ok && data.success) {
  //       onSubmit(updatedData);
  //       setSuccessMessage("✅ Canvis desats correctament!");

  //       setTimeout(() => {
  //         setSuccessMessage("");
  //         onClose();
  //       }, 2000);
  //     } else {
  //       setPassError(data.error || "Error de verificació.");
  //     }
  //   } catch (error) {
  //     setPassError(`Error del servidor al verificar la contrasenya: ${error}`);
  //   } finally {
  //     setIsVerifying(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setIsVerifying(true);

    if (!currentPassword) {
      setPassError("Has d'introduir la contrasenya actual.");
      setIsVerifying(false);
      return;
    }

    const payload = {
      password: currentPassword, // ahora se envía junto
      updateData: {
        average_price: averagePrice,
        has_wifi: hasWifi,
        pet_friendly: petFriendly,
        can_smoke: canSmoke,
        has_disabled_access: hasDisabledAccess,
        reservation_fee: reservationFee,
        tables,
        seats,
        phone_num: phoneNum,
        instagram_account: instagramAccount,
        website,
        profile_pic: profilePic,
      },
    };
console.log(payload.updateData)
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_ALL_TERRACES}/${terrace.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("✅ Canvis desats correctament!");
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 2000);
      } else {
        setPassError(data.error || "Error al desar els canvis.");
      }
    } catch (error) {
      setPassError(`Error del servidor: ${error}`);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Editar Terrassa
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* 🟡 Campo: Nom del local */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Nom del local:
            </label>
            <div className="relative">
              <input
                type="text"
                value={terrace.business_name}
                readOnly
                className="w-full px-4 py-2 border rounded pr-10 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowInfo(!showInfo)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                aria-label="Informació"
              >
                <FiInfo size={18} />
              </button>
            </div>
            {showInfo && (
              <p className="text-sm text-gray-600 mt-2">
                Per modificar el nom del teu local posa't en contacte amb
                nosaltres.
              </p>
            )}
          </div>
          {/* 🟢 Campo: Preu mitjà */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Preu mitjà (€)
            </label>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={averagePrice}
              onChange={(e) => setAveragePrice(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="Preu mitjà"
            />
          </div>
          {/* Campo Wifi */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Hi ha wifi per als clients?
            </label>
            <select
              value={hasWifi === null ? "" : hasWifi.toString()}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "true") setHasWifi(true);
                else if (value === "false") setHasWifi(false);
                else setHasWifi(null);
              }}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
          {/* S'admeten mascotes? */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              S'admeten mascotes?
            </label>
            <select
              value={petFriendly === null ? "" : petFriendly.toString()}
              onChange={(e) => {
                const val = e.target.value;
                setPetFriendly(
                  val === "true" ? true : val === "false" ? false : null
                );
              }}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>

          {/* Accés per a mobilitat reduïda */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Hi ha accés per a gent amb mobilitat reduïda?
            </label>
            <select
              value={
                hasDisabledAccess === null ? "" : hasDisabledAccess.toString()
              }
              onChange={(e) => {
                const val = e.target.value;
                setHasDisabledAccess(
                  val === "true" ? true : val === "false" ? false : null
                );
              }}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>

          {/* Es pot fumar? */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Es pot fumar?
            </label>
            <select
              value={canSmoke === null ? "" : canSmoke.toString()}
              onChange={(e) => {
                const val = e.target.value;
                setCanSmoke(
                  val === "true" ? true : val === "false" ? false : null
                );
              }}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
          {/* Tarifa de reserva per persona */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tarifa de reserva per persona
            </label>
            <input
              type="number"
              value={reservationFee}
              onChange={(e) => setReservationFee(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded 
               appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none 
               [&::-webkit-outer-spin-button]:appearance-none"
              min={0}
            />
          </div>

          {/* Nombre de taules */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Nombre de taules
            </label>
            <input
              type="number"
              value={tables}
              onChange={(e) => setTables(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded 
               appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none 
               [&::-webkit-outer-spin-button]:appearance-none"
              min={0}
            />
          </div>

          {/* Nombre de cadires */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Nombre de cadires
            </label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded 
               appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none 
               [&::-webkit-outer-spin-button]:appearance-none"
              min={0}
            />
          </div>

          {/* Número de contacte */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Número de contacte
            </label>
            <input
              type="text"
              value={phoneNum}
              onChange={(e) => {
                const input = e.target.value;

                if (/^\d{0,9}$/.test(input)) setPhoneNum(input);
              }}
              className="w-full px-4 py-2 border rounded"
              placeholder="931234567"
            />
          </div>

          {/* Enllaç d'Instagram */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Enllaç d'Instagram
            </label>
            <input
              type="text"
              value={instagramAccount}
              onChange={(e) => setInstagramAccount(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="https://www.instagram.com/elteucompted'instagram"
            />
          </div>

          {/* Enllaç de lloc web */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Enllaç de lloc web
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="https://elteullocweb.cat"
            />
          </div>

          {/* URL d'imatge */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              URL d'imatge
            </label>
            <input
              type="text"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="https://example.com/imatge.jpg"
            />
          </div>

          {/* Campo contraseña */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Contrasenya actual (obligatòria):
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded pr-10"
                placeholder="Contrasenya actual"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                aria-label={
                  showPassword
                    ? "Amaga la contrasenya"
                    : "Mostra la contrasenya"
                }
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {passError && (
              <p className="text-red-500 text-sm mt-1">{passError}</p>
            )}
          </div>
          {successMessage && (
            <p className="text-green-600 font-medium text-center">
              {successMessage}
            </p>
          )}

          {/* Botón guardar */}
          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={isVerifying}
              className={`${
                isVerifying ? "opacity-50 cursor-not-allowed" : ""
              } bg-siya-dark-green text-siya-lemon-cream font-bold py-2 w-full px-4 rounded`}
            >
              {isVerifying ? "Verificant..." : "Desar canvis"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTerrace;
