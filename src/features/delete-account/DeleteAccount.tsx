import { useState } from "react";
import API from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface DeleteAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccount({ isOpen, onClose }: DeleteAccountProps) {
  const [password_hash, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDelete = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userString = localStorage.getItem("user");
    if (!userString) return navigate("/login");

    const user = JSON.parse(userString);
    const token = localStorage.getItem("token");

    try {
      await API.delete(`/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password_hash },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setSuccess("El teu compte s'ha eliminat correctament. Esperem tornar-te a veure aviat!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError((err as any).response?.data?.error || "Error a l'eliminar compte");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4">Segur que vols eliminar el teu compte?</h3>
        <h4 className="text-center font-bold mb-4">S'esborraran totes les teves dades, com ara favorits i reserves, i no es podran recuperar.</h4>
        <form onSubmit={handleDelete} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Introdueix la teva contrasenya:</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password_hash}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                aria-label={
              showPassword ? "Amaga la contrasenya" : "Mostra la contrasenya"
            }
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Sí, vull eliminar el meu perfil.
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </div>
    </div>
  );
}

