import React, { useState } from "react";
import API from "../../services/apiUser";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import TermsModal from "../../components/TermsModal";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Usamos 'password' para el input del frontend
  const [birthDate, setBirthDate] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTermsChange = (event) => {
    setAgreedToTerms(event.target.checked);
    if (event.target.checked) {
      setTermsError('');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccessMessage(""); 
    setTermsError("")

 
    if (password.length < 8) {
      setError("La contrasenya deu contenir 8 caràcters com a mínim.");
      return;
    }
    if (!agreedToTerms) {
      setTermsError("Has d'acceptar els termes i condicions per a registrar-te.");
      return; 
    }



    try {
      
      const res = await API.post("/users", {
        name,
        email,
        password_hash: password, 
        birth_date: birthDate
      });
      console.log("Usuari registrat:", res.data);
      setSuccessMessage("T'has registrat correctament! Ara pots iniciar sessió.");
     
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
    } catch (err) {
      console.error("Error de registre:", err.response?.data || err);
      
      if (
        err.response?.data?.details &&
        Array.isArray(err.response.data.details)
      ) {
        const zodErrors = err.response.data.details
          .map((detail) => detail.message)
          .join("; ");
        setError(`Dades invàlides: ${zodErrors}`);
      } else {
        setError(err.response?.data?.error || "Error al registrar usuari");
      }
    }
  };
      const openModal = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <form onSubmit={handleSignUp}
    className='flex flex-col w-4/5 m-auto'>
        <label htmlFor="name"
        className='mt-4'>Nom</label>
        <input 
          type="text" 
          name="name"
          placeholder="Nom" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
          className='w-full md:w-1/2 mt-2'
        />
        <label htmlFor="email"
        className='mt-4'>Correu electrònic</label>
        <input 
          type="email"
          name="email"
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          className='w-full md:w-1/2 mt-2'
        />
        <label htmlFor="password"
        className='mt-4'>Contrasenya</label>
        <input 
          type="password" 
          name="password"
          placeholder="Contrasenya (mín. 8 caracteres)"
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          className='w-full md:w-1/2 mt-2'
        />
        <label htmlFor="bdate"
        className='mt-4'>Data de naixement</label>
        <input 
          type="date"
          name="bdate"
          max="2013-12-31"
          placeholder="YYYY-MM-DD" 
          value={birthDate} 
          onChange={e => setBirthDate(e.target.value)} 
          required 
          className='w-full md:w-1/2 mt-2'
        />
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={agreedToTerms}
            onChange={handleTermsChange}
            className="h-4 w-4 bg-black text-white rounded"
          />
          <label htmlFor="terms" className="ml-2 text-sm">
            Termes i condicions
          </label>
        </div>
          <label className=" text-sm ml-6 mt-1 underline"
          ><a href="#"
              onClick={openModal}>Llegir-ne més</a></label>

        {error && <p className="text-siya-principal">{error}</p>}
        {termsError && (
          <p className="text-siya-principal">{termsError}</p>
        )}
        <Button
          type="submit"
          className="w-full md:w-fit bg-siya-dark-green text-siya-lemon-cream font-bold py-2 px-4 mt-4 rounded"
          disabled={!agreedToTerms}
        >
          Registra't
        </Button>
        {successMessage && <p className="text-green-700 mt-4 text-center">{successMessage}</p>}
        <p className="mt-4 text-center md:text-left"><Link to='/login' className="text-siya-dark-green underline cursor-pointer">Ja tens un compte?</Link></p>
    </form>
    <TermsModal
        isOpen={isModalOpen}
        onClose={closeModal}
      ></TermsModal>
    
    </>
  )
}

export default SignUpForm;
