import { useState } from "react";
import API from "../../services/apiUser";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const [password_hash, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    //const user = JSON.parse(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    const token = localStorage.getItem("token");

    try {
      await API.delete(`/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password_hash },
      });

      // Limpiar sesión
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setSuccess("Tu cuenta ha sido eliminada correctamente.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al eliminar cuenta");
    }
  };

  return (
    <form onSubmit={handleDelete} className="flex flex-col w-4/5 m-auto shadow-lg p-4 mt-6">
      <h3 className="mb-4 text-lg font-bold">Eliminar cuenta</h3>

      <label htmlFor="password">Introduce tu contraseña:</label>
      <div className="relative w-full md:w-1/2 mt-2">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          value={password_hash}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pr-10 px-4 py-2 border rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white mt-4 py-2 px-4 rounded hover:bg-red-700"
      >
        Confirmar eliminación
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </form>
  );
}
