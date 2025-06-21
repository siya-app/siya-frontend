import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaFilter, FaUser } from 'react-icons/fa'; // Importing icons
import { HiOutlineTicket } from "react-icons/hi";
import { ImCalendar } from "react-icons/im";
import { RiCalendarCheckFill } from "react-icons/ri";


export default function Footer() {
    return (
        <footer className="siya2-bg text-white p-3 fixed bottom-0 left-0 w-full border-t border-white/20">
            <nav className="flex justify-around items-center z-[9999]">
                <Link
                    to="/"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <FaMapMarkerAlt className="text-lg mb-1" />
                    <span>Prop teu</span>
                </Link>

                <Link
                    to="/buscar-terrassa"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <RiCalendarCheckFill className="text-lg mb-1" />
                    <span>Reservar</span>
                </Link>

                <Link
                    to="/perfil"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <FaUser className="text-lg mb-1" />
                    <span>Perfil</span>
                </Link>
            </nav>
        </footer>
    );
}