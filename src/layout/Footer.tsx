import { Link} from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="siya2-bg text-white p-4 flex justify-between items-center fixed bottom-0 left-0 w-full">
            <nav className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm sm:text-base">
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:underline">A prop teu</Link></li>
                    <li><Link to="/buscar-terraza" className="hover:underline">Buscar Terrassa</Link></li>
                    <li><Link to="/perfil" className="hover:underline">Perfil</Link></li>
                </ul>
            </nav>
        </footer>
    );
}