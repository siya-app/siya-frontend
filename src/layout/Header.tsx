import { Link } from "react-router-dom";
// import logoSiya from '../../public/bg-transp-logo-siya 1.svg'
import BurgerMenu from "./Burger";

export default function Header() {
    return (
        <header className="flex flex-row justify-between siya2-bg siyaRed-text p-1">
                <div>
                    <Link to='/'>
                        <img src={"bg-transp-logo-siya 1.svg"} alt="Logo Siya" className="h-15" />
                    </Link>
                </div>
                <nav>
                    <BurgerMenu />
                </nav>
        </header>
    );
}