import { useState } from "react";
import API from "../../services/apiUser";
import Button from "../../components/Button";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password_hash });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Login amb èxit", res.data.user);
      navigate("/perfil");

    } catch (err) {
      setError(err.response?.data?.error || "No s'ha pogut iniciar sessió");
    }
  };

  return (
    <>
      <form onSubmit={login} className="flex flex-col w-4/5 m-auto shadow-lg p-4 mb-4">
        <h3>Accedir →</h3>
        <label htmlFor="email" className="mt-4">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full md:w-1/2 mt-2 border rounded p-2"
        />
        <label htmlFor="contrasenya" className="mt-4">
          Contrasenya
        </label>
        <div className="relative w-full md:w-1/2 mt-4">
          <input
            type={showPassword ? "text" : "password"}
            name="contrasenya"
            placeholder="Contrasenya"
            value={password_hash}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pr-10 px-4 py-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            aria-label={
              showPassword ? "Amaga la contrasenya" : "Mostra la contrasenya"
            }
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div className="mt-4 w-full md:w-1/2 flex flex-col md:flex-row md:justify-between gap-2">
          <Button
            type="submit"
            className="bg-siya-dark-green
        text-siya-lemon-cream
        font-bold
        py-2
        px-4
        rounded
        cursor-pointer"
          >
            Inicia sessió
          </Button>

          <Button className="text-siya-dark-green underline py-2 px-4 bg-white cursor-pointer">
            <Link to="/sign-up">Registra't</Link>
          </Button>
        </div>
        {error && <p className="text-siya-principal">{error}</p>}
      </form>
    </>
  );
}
