import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/UserProfile";
import FilterPage from "../pages/FilterPage";
import BookingPage from "../pages/BookingPage";
import NotFoundPage from "../pages/NotFoundPage";
/* import TerraceDetailsView from "../features/terraces/TerraceDetailsView";
 */import TerraceDetailsView from "../features/terraces/TerraceDetailsView";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/buscar-terrassa" element={<FilterPage />} />
      <Route path="/reservar" element={<BookingPage />} />
      <Route
        path="/terrassa/:id"
        element={<TerraceDetailsView />}
      />

      <Route path="*" element={<NotFoundPage />} />  {/* Catch-all 404 route */}

{/*       <Route path="/terrassa/:id" element={<TerraceDetailsView terrace={selectedTerrace} />} />
 */}
    </Routes>
  );
};

export default AppRoutes;
