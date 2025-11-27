import { Link } from "react-router-dom";
// import logoSiya from '../../public/bg-transp-logo-siya 1.svg'
import BurgerMenu from "./Burger";

export default function Header() {
    return (
        <header className="siya2-bg siyaRed-text p-1">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/'>
                    <img src={"bg-transp-logo-siya 1.svg"} alt="Logo Siya" className="h-15" />
                </Link>
                <nav>
                    <BurgerMenu/>
                </nav>
            </div>
        </header>
    );
}