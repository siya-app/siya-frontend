import longTicket from '../assets/long-ticket.jpg';
import { ImCheckmark } from "react-icons/im";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function PartnerPage() {

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen m-0 pb-10 w-full h-full">
            {/* Background Image (with opacity) */}
            <div
                className="absolute inset-0
                bg-cover bg-center bg-repeat
                opacity-40 z-0
                overflow-hidden
                "
                style={{ backgroundImage: `url(${longTicket})`, backgroundSize: "cover" }}
            />

            {/* Content (full opacity) */}
            <div className="relative z-10 place-items-end m-0 w-full h-full"> {/* z-10 brings content above background */}
                <h1 className="text-5xl w-[80%] text-right mx-8 my-0
                siyaRed-text md:text-8xl md:w-1/2
                montserrat-siya
                text-balance">
                    Aquest pot ser el teu nou ticket de tancament de caixa ;D
                </h1>
                {/* Add other content here */}
            </div>
            <div className="relative
            place-items-center
            text-wrap
            m-10 mt-6 text-gray-700
            rounded-xl
            border-siya-principal
            border-r-4 border-b-4">
                <div className='bg-gray-300/60 p-4 rounded-xl'>
                    <p className='font-bold text-balance pl-6'>
                        Registra't i reclama el teu establiment. Si no apareix, pots crear-lo de zero! Podràs:</p>
                    <ul className='pl-6 mt-2 space-y-2 list-none'>
                        <li className="relative">
                            <ImCheckmark className="absolute -left-5 w-3 h-3 mt-1.5" />
                            <span className="pl-1">Gestionar reserves directament</span>
                        </li>
                        <li className="relative">
                            <ImCheckmark className="absolute -left-5 w-3 h-3 mt-1.5" />
                            <span className="pl-1">Definir el preu de reserva per comensal</span>
                        </li>
                        <li className="relative">
                            <ImCheckmark className="absolute -left-5 w-3 h-3 mt-1.5" />
                            <span className="pl-1">Crear promocions exclusives</span>
                        </li>
                        <li className="relative">
                            <ImCheckmark className="absolute -left-5 w-3 h-3 mt-1.5" />
                            <span className="pl-1">Afegir etiquetes per aparèixer a les cerques</span>
                        </li>
                        <li className="relative">
                            <ImCheckmark className="absolute -left-5 w-3 h-3 mt-1.5" />
                            <span className="pl-1">Personalitzar el teu perfil completament</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='relative items-center'>
                <h3 className='text-2xl m-8
                montserrat-siya font-extrabold
                siyaRed-text'>Guanya visibilitat i omple la teva terrassa amb Siya!</h3>
                <Button
                    onClick={() => navigate("/perfil/#claimTerrace")}
                    className={`text-primary-content px-4 py-2 mt-8
                    m-4 bg-gr bg-siya-principal text-white rounded-full
                    flex justify-between items-center
                    toggle-height
                    mx-auto `}>
                    Vull ser partner
                </Button>
            </div>
            {/* <p className="absolute left-3 bottom-1 md:left-6 md:bottom-6 text-xs text-gray-400">
                Fotografia: kaboompics.com
            </p> */}
        </div >
    );
}

export default PartnerPage;