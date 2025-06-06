import { Link} from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <nav className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm sm:text-base">
                <ul className="flex space-x-4">
                    <li><Link to="/perfil" className="hover:underline">Perfil</Link></li>
                    <li><Link to="/buscar-terraza" className="hover:underline">Buscar Terrassa</Link></li>
                    <li><Link to="/reservar" className="hover:underline">Reservar</Link></li>
                </ul>
            </nav>
        </footer>
    );
}