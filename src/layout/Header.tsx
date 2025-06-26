import { Link } from "react-router-dom";
import logoSiya from '../assets/siya-chair-logo.svg'
import BurgerMenu from "./Burger";

export default function Header() {
    return (
        <header className="siya2-bg siyaRed-text p-1">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/'>
                    <img src={logoSiya} alt="Logo Siya" className="ms-2 h-12" />
                </Link>
                <nav>
                    <BurgerMenu/>
                </nav>
            </div>
        </header>
    );
}