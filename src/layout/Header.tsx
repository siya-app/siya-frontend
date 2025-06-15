import { Link } from "react-router-dom";
import logoSiya from '../../public/bg-transp-logo-siya 1.svg'

export default function Header() {
    return (
        <header className="siya2-bg text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/'>
                    <img src={logoSiya} alt="Logo Siya" className="h-20" />
                </Link>
                <nav>
                    
                </nav>
            </div>
        </header>
    );
}