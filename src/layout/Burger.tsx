// import { useState, useEffect } from 'react';
// import { FiMenu, FiX } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// const BurgerMenu = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);

//     // Check screen size on mount and resize
//     useEffect(() => {
//         const checkScreenSize = () => {
//             setIsMobile(window.innerWidth < 768); // 768px = typical tablet breakpoint
//         };

//         checkScreenSize();
//         window.addEventListener('resize', checkScreenSize);
//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, []);

//     const toggleMenu = () => setIsOpen(!isOpen);

//     const links = [
//         { name: 'Inici', path: '/' },
//         { name: 'Qui som', path: '/nosaltres' },
//         { name: 'Contacte', path: '/contacte' },
//         { name: 'Reservar', path: '/buscar-terrassa' },
//         { name: 'Perfil', path: '/perfil' },
//         { name: 'Log In', path: '/' },
//         { name: 'Log Out', path: '/' },

//     ];

//     return (
//         <nav className="bg-transparent p-3 montserrat-siya">
//             {/* Desktop/Tablet Links */}
//             <div className="hidden md:flex space-x-6">
//                 {links.map((link) => (
//                     <a key={link.name} href={link.path} className="hover:text-white p-1 hover:bg-red-500 rounded-md">
//                         {link.name}
//                     </a>
//                 ))}
//             </div>

//             {/* Mobile Burger Button */}
//             {isMobile && (
//                 <button
//                     onClick={toggleMenu}
//                     className="md:hidden text-3xl focus:outline-none siyaRed-text transition-transform duration-300 hover:scale-110"
//                     aria-label="Toggle menu"
//                 >
//                     {isOpen ? <FiX /> : <FiMenu />}
//                 </button>
//             )}

//             {/* Animated Mobile Menu */}
//             <div className={`
//             md:hidden absolute left-0 right-0 bg-red-500 shadow-lg
//             py-1 px-3 mt-4 z-50 rounded-lg
//             origin-top
//             rounded-bl-xl rounded-br-full
//             transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
//             ${isOpen ?
//                     'opacity-100 scale-y-100' :
//                     'opacity-0 scale-y-0 pointer-events-none'
//                 }`}>
//                 {links.map((link) => (
//                     <a
//                         key={link.name}
//                         href={link.path}
//                         className="block py-2 text-white hover:bg-gray-100 hover:bg-opacity-20 transition-colors duration-200"
//                         onClick={() => setIsOpen(false)}
//                     >
//                         {link.name}
//                     </a>
//                 ))}
//             </div>
//         </nav>
//     );
// };

// export default BurgerMenu;


//--------------NEW----------//
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsOpen(false);
        navigate('/');
    };

    const links = [
        { name: 'Inici', path: '/' },
        { name: 'Qui som', path: '/nosaltres' },
        { name: 'Contacte', path: '/contacte' },
        { name: 'Reservar', path: '/buscar-terrassa' },
        { name: 'Perfil', path: '/perfil' },
        
    ];

    return (
        <nav className="bg-transparent p-3 montserrat-siya">
            {/* Desktop */}
            <ul className="hidden md:flex space-x-6">
                {links.map(link => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className="hover:text-white p-1 hover:bg-red-500 rounded-md"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
                {isLoggedIn ? (
            <button
                onClick={handleLogout}
                className="hover:text-white p-1 hover:bg-red-500 rounded-md"
            >
                Log Out
            </button>
        ) : (
            <Link
                to="/login"
                className="hover:text-white  hover:bg-red-500 rounded-md"
            >
                Log In
            </Link>
        )}
            </ul>

            {/* Mobile button */}
            {isMobile && (
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-3xl focus:outline-none siyaRed-text transition-transform duration-300 hover:scale-110"
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
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className="block py-2 text-white hover:bg-gray-100 hover:bg-opacity-20 transition-colors duration-200"
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
                className="block w-full text-left py-2 text-white hover:bg-gray-100 hover:bg-opacity-20 transition-colors duration-200"
            >
                Log Out
            </button>
        ) : (
            <Link
                to="/"
                className="block py-2 text-white hover:bg-gray-100 hover:bg-opacity-20 transition-colors duration-200"
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
