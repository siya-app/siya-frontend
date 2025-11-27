import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiCalendarCheckFill } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { FaChair } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="siya2-bg text-siya-principal p-3 fixed bottom-0 left-0 w-full border-t border-white/20">
            <nav className="flex justify-around items-center z-[9999]">
                <Link
                    to="/"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <HiHome className="text-lg mb-1" />
                    <span>Inici</span>
                </Link>

                <Link
                    to="/buscar-terrassa"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <FaChair className="text-lg mb-1" />
                    <span>Terrasses</span>
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