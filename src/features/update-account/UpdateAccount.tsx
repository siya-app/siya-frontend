import { useState, useContext } from "react";
import API from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";

export default function UpdateAccount({ isOpen, onClose }) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  if (!auth) return null;

  const { setUser } = auth;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Has d'introduir la teva contrasenya actual.");
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setError("La nova contrasenya ha de contenir 8 caràcters com a mínim.");
      return;
    }

    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userString || !token) {
      return navigate("/login");
    }

    const user = JSON.parse(userString);

    try {
      const res = await API.put(
        `/users/${user.id}`,
        {
          name: name || user.name,
          currentPassword,
          newPassword: newPassword || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { id, name: updatedName, email } = res.data.user;
      const newUser = { id, name: updatedName, email };

     
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      setSuccess("Perfil actualitzat correctament.");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error a l'actualizar perfil");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
        <h3 className="text-xl font-bold mb-4">Editar perfil</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Canvia el nom (opcional):</label>
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Canvia la contrasenya (opcional):</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded pr-10"
                placeholder="Nova contrasenya"
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

          <div>
            <label className="block mb-1">Contrasenya actual (obligatoria):</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded pr-10"
                placeholder="Contrasnya actual"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                aria-label={
              showCurrentPassword ? "Amaga la contrasenya" : "Mostra la contrasenya"
            }
              >
                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-siya-principal text-white py-2 rounded"
          >
            Desar canvis
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </div>
    </div>
  );
}
