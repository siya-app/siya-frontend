import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface TerraceUnclaimProps {
  isOpen: boolean;
  onClose: () => void;
  onUnclaimSuccess: () => void;
}

function TerraceUnclaim({
  isOpen,
  onClose,
  onUnclaimSuccess,
}: TerraceUnclaimProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserId(user.id);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setError("");
      setIsProcessing(false);
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Has d'introduir la contrasenya.");
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      const verifyURL = import.meta.env.VITE_VERIFY_PASSWORD_URL;
      const unclaimURL = `${
        import.meta.env.VITE_API_ALL_USERS
      }/${userId}/unclaim-terrace`;

      const verifyRes = await fetch(verifyURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        setError(verifyData.error || "Verificació fallida.");
        setIsProcessing(false);
        return;
      }

      const unclaimRes = await fetch(unclaimURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const unclaimData = await unclaimRes.json();

      if (!unclaimRes.ok) {
        setError(unclaimData.error || "No s'ha pogut desfer la propietat.");
        setIsProcessing(false);
        return;
      }

      setSuccessMessage(
        "Has deixat de ser propietari/ària d’aquesta terrassa."
      );
      setTimeout(() => {
        onUnclaimSuccess();
        setSuccessMessage("");
        onClose();
      }, 1800);
    } catch (err) {
      setError(`Error inesperat al comunicar amb el servidor: ${err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;
if (!userId) return null;
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Segur que vols cancel·lar la propietat d'aquesta terrassa?
        </h3>
        <p className="text-sm mb-4">
          - Recorda que no podràs modificar dades de la teva terrassa ni
          gestionar-ne reserves.
        </p>
        <p className="text-sm mb-4">
          - Si una terrassa no està reclamada, no s'hi poden fer reserves.
          Tanmateix, les reserves fetes abans del moment en què es renúncia la
          seva propietat seguiran a peu i no s'anul·laran.
        </p>
        <p className="text-sm mb-4">
          - Un cop donat de baixa com a propietari/ària, podràs tornar a
          reclamar una terrassa.
        </p>

        <p className="text-sm text-gray-700 mb-4">
          Introdueix la teva contrasenya per confirmar que vols deixar de ser
          propietari/ària d’aquesta terrassa.
        </p>
        {successMessage && (
          <div className="bg-green-100 text-green-800 text-sm px-4 py-2 rounded mb-4 border border-green-300">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded pr-10"
                placeholder="Contrasenya"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-2 px-4 rounded text-white font-semibold ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isProcessing
              ? "Processant..."
              : "Sí, vull donar-me de baixa com a propietari/ària"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TerraceUnclaim;
