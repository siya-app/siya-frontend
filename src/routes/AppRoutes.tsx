import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/UserProfile";
import FilterPage from "../pages/FilterPage";
import BookingPage from "../pages/BookingPage";
import NotFoundPage from "../pages/NotFoundPage";
import TerraceDetailsView from "../features/terraces/TerraceDetailsView";
import AboutUs from "../pages/AboutUsPage";
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import PartnerPage from "../pages/PartnerPage";
import ContactUsPage from "../pages/contactUsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/buscar-terrassa" element={<FilterPage />} />
      <Route path="/reservar" element={<BookingPage />} />
      <Route path="/nosaltres" element={<AboutUs />} />
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/partners" element={<PartnerPage/>}/>
      <Route path="/contacte" element={<ContactUsPage/>}/>
      <Route
        path="/terrassa/:id"
        element={<TerraceDetailsView />}
      />
      <Route path="*" element={<NotFoundPage />} />  {/* Catch-all 404 route */}
    </Routes>
  );
};

export default AppRoutes;
