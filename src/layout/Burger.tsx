import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useRef } from 'react';


const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsOpen(false);
        navigate('/');
        // window.location.reload
    };

    const links = [
        { name: 'Inici', path: '/' },
        { name: 'Qui som', path: '/nosaltres' },
        { name: 'Contacte', path: '/contacte' },
        { name: 'Reservar', path: '/buscar-terrassa' },
        { name: 'Perfil', path: '/perfil' },
        { name: 'Fes-te partner!', path: '/partners' }
    ];

    return (
        <nav ref={menuRef} className="bg-transparent p-3 montserrat-siya">
            {/* Desktop */}
            <ul className="hidden md:flex space-x-6 items-center whitespace-nowrap">
                {links.map(link => (
                    <li className='w-fit' key={link.name}>
                        <Link
                            to={link.path}
                            className="hover:text-white border-2 border-transparent hover:bg-red-500 hover:border-siya-principal py-1 px-3 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
                <li className='w-fit'>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="hover:text-white border-2 border-transparent hover:bg-red-500 hover:border-siya-principal py-1 px-3 rounded-md"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="hover:text-white border-2 border-transparent hover:bg-red-500 hover:border-siya-principal py-1 px-3 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Log In
                        </Link>
                    )}
                </li>
            </ul>

            {/* Mobile button */}
            {isMobile && (
                <button
                    onClick={toggleMenu}
                    className="md:hidden w-fit text-3xl focus:outline-none siyaRed-text transition-transform duration-300 hover:scale-110"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            )}

            {/* Mobile menu */}
            <ul className={`
                md:hidden absolute left-0 right-0 bg-red-500 shadow-lg
                py-1 px-3 mt-4 z-50 rounded-lg origin-top
                rounded-bl-xl rounded-br-full
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
            `}>
                {links.map(link => (
                    <li className='w-fit' key={link.name}>
                        <Link
                            to={link.path}
                            className="block py-2 text-white hover:border-2 hover:border-white hover:rounded-full px-2 transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
                <li>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="block py-2 text-white hover:border-2 hover:border-white hover:rounded-full px-2 transition-colors duration-200 mb-3"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link
                            to="/#loginForm"
                            className="block py-2 text-white hover:border-2 hover:border-white hover:rounded-full px-2 transition-colors duration-200 mb-3"
                            onClick={() => setIsOpen(false)}
                        >
                            Log In
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default BurgerMenu;
