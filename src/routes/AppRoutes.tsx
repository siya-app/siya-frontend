import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/UserProfile";
import FilterPage from "../pages/FilterPage";
import BookingPage from "../pages/BookingPage";
import NotFoundPage from "../pages/NotFoundPage";
/* import TerraceDetailsView from "../features/terraces/TerraceDetailsView";*/
import TerraceDetailsView from "../features/terraces/TerraceDetailsView";
import AboutUs from "../pages/AboutUs";
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/buscar-terrassa" element={<FilterPage />} />
      <Route path="/reservar" element={<BookingPage />} />
      <Route path="/nosaltres" element={<AboutUs />} />
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route
        path="/terrassa/:id"
        element={<TerraceDetailsView />}
      />
      <Route path="*" element={<NotFoundPage />} />  {/* Catch-all 404 route */}
    </Routes>
  );
};

export default AppRoutes;
