import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/'>
                    <img src='.//bg-transp-logo-siya 1.svg' alt="Logo Siya" className="h-20" />
                </Link>
                <nav>
                    
                </nav>
            </div>
        </header>
    );
}