import { useEffect, useState, useContext } from "react";
import React from "react";
import API from "../services/apiUser";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TerraceClaim from "../features/terrace-claim/TerraceClaim";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import Button from "../components/Button";
import DeleteAccount from "../features/delete-account/DeleteAccount";
import UpdateAccount from "../features/update-account/UpdateAccount";
import AuthContext from "../context/AuthContext";

// export default function Profile() {
//   const [user, setUser] = useState<any>(null);
//   const navigate = useNavigate();
//   const { terraceList } = useTerraceList();
//   const [openSection, setOpenSection] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     console.log(storedUser);

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       navigate("/login");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   if (!user) return <p>Carregant dades de l'usuari...</p>;

//   return (
//     <>
//       <div className="w-fit mx-auto p-6 bg-white shadow-lg rounded-lg m-3 ms-5 me-5 text-center">
//         <h2 className="text-3xl font-bold text-center mb-6 text-siya-dark-green">
//           Hola, {user.name}!
//         </h2>
//         <div className="space-y-3 text-gray-700">
//           <p className="text-lg">
//             <span className="font-semibold">Email:</span> {user.email}
//           </p>
//         </div>
//       </div>
//       <Button
//         onClick={() => navigate("/buscar-terrassa")}
//         className={`text-primary-content px-4 py-2 mt-8
//         m-4 bg-gr bg-siya-principal text-white rounded-full
//         flex justify-between items-center
//         toggle-height
//         mx-auto`}
//       >
//         Reservar taula
//       </Button>
//       <TerraceSlider list={terraceList} orderBy={"nearby"} />
//       <div
//         onClick={() => setOpenSection((prev) => !prev)}
//         className="cursor-pointer collapse-title
//         text-primary-content px-4 py-2
//         m-4 bg-siya-terciario
//         flex justify-between items-center
//         toggle-height
//         rounded
//         "
//       >
//         <h3 id="claimTerrace" className="text-xl m-2">
//           Ets propietari d'una terrassa?
//         </h3>
//         {openSection ? (
//           <FaChevronUp className="siyaDark-text" />
//         ) : (
//           <FaChevronDown className="siyaDark-text" />
//         )}
//       </div>
//       <div
//         className={`toggle-height transition-all duration-600 ${
//           openSection ? "max-h-[1000px]" : "max-h-0"
//         }`}
//       >
//         <div className="p-4">
//           <TerraceClaim />
//         </div>
//       </div>
//       <div className="m-auto w-fit mb-4">
//         <Button
//           onClick={() => setShowEditModal(true)}
//           className="border-2 border-siya-principal rounded-xl p-2 bg-gr bg-siya-principal text-white"
//         >
//           Editar perfil
//         </Button>
//       </div>
//       <div className="m-auto w-fit">
//         <Button
//           onClick={() => setShowModal(true)}
//           className="border-2 border-siya-principal rounded-xl p-2 bg-gr bg-siya-principal text-white"
//         >
//           Eliminar compte
//         </Button>
//       </div>
//       <UpdateAccount
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//       />
//       <DeleteAccount isOpen={showModal} onClose={() => setShowModal(false)} />
//       <div className="flex justify-center m-5">
//         <Button
//           onClick={handleLogout}
//           className={`border-2 border-siya-principal rounded-xl p-2 text-siya-principal w-fit`}
//         >
//           Log out
//         </Button>
//       </div>
//     </>
//   );
// }


export default function Profile() {
  const { user, logout } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const { terraceList } = useTerraceList();

  const [openSection, setOpenSection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) return <p>Carregant dades de l'usuari...</p>;

  return (
    <>
      <div className="w-fit mx-auto p-6 bg-white shadow-lg rounded-lg m-3 ms-5 me-5 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-siya-dark-green">
          Hola, {user.name}!
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>

      <Button
        onClick={() => navigate("/buscar-terrassa")}
        className="text-primary-content px-4 py-2 mt-8 m-4 bg-siya-principal text-white rounded-full flex justify-between items-center toggle-height mx-auto"
      >
        Reservar taula
      </Button>

      <TerraceSlider list={terraceList} orderBy={"nearby"} />

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
        <div className="p-4">
          <TerraceClaim />
        </div>
      </div>

      <div className="m-auto w-fit mb-4">
        <Button
          onClick={() => setShowEditModal(true)}
          className="border-2 border-siya-principal rounded-xl p-2 bg-siya-principal text-white"
        >
          Editar perfil
        </Button>
      </div>

      <div className="m-auto w-fit">
        <Button
          onClick={() => setShowModal(true)}
          className="border-2 border-siya-principal rounded-xl p-2 bg-siya-principal text-white"
        >
          Eliminar compte
        </Button>
      </div>

      <UpdateAccount
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <DeleteAccount isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="flex justify-center m-5">
        <Button
          onClick={logout}
          className="border-2 border-siya-principal rounded-xl p-2 text-siya-principal w-fit"
        >
          Log out
        </Button>
      </div>
    </>
  );
}