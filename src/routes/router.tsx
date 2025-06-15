import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookingPage from "../pages/BookingPage";
import FilterPage from "../pages/FilterPage";
import UserProfile from "../pages/UserProfile";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/terrace-finder' element={<FilterPage />} />
            <Route path='/booking' element={<BookingPage />} />
            <Route path='/my-siya' element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />  {/* Catch-all 404 route */}
        </Routes>
    );
};
