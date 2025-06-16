import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/UserProfile";
import FilterPage from "../pages/FilterPage";
import BookingPage from "../pages/BookingPage";
import TerraceDetailsView from "../features/terraces/TerraceDetailsView";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/buscar-terraza" element={<FilterPage />} />
      <Route path="/reservar" element={<BookingPage />} />
      <Route
        path="/terrassa/:id"
        element={<TerraceDetailsView />}
      />

      <Route path="*" element={<h1 className="text-siya-red">404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
