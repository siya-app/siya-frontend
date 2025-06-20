// import { Link} from 'react-router-dom';
// export default function Footer() {
//     return (
//         <footer className="siya2-bg text-white p-4 flex justify-between items-center fixed bottom-0 left-0 w-full">
//             <nav className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm sm:text-base">
//                 <ul className="flex space-x-4">
//                     <li><Link to="/" className="hover:underline">A prop teu</Link></li>
//                     <li><Link to="/buscar-terraza" className="hover:underline">Buscar Terrassa</Link></li>
//                     <li><Link to="/perfil" className="hover:underline">Perfil</Link></li>
//                 </ul>
//             </nav>
//         </footer>
//     );
// }


import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaFilter, FaUser } from 'react-icons/fa'; // Importing icons

export default function Footer() {
    return (
        <footer className="siya2-bg text-white p-3 fixed bottom-0 left-0 w-full border-t border-white/20">
            <nav className="flex justify-around items-center z-[9999]">
                <Link
                    to="/"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <FaMapMarkerAlt className="text-lg mb-1" />
                    <span>Near You</span>
                </Link>

                <Link
                    to="/buscar-terraza"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <FaFilter className="text-lg mb-1" />
                    <span>Filters</span>
                </Link>

                <Link
                    to="/perfil"
                    className="flex flex-col items-center text-xs hover:text-gray-200 transition-colors"
                >
                    <FaUser className="text-lg mb-1" />
                    <span>Account</span>
                </Link>
            </nav>
        </footer>
    );
}