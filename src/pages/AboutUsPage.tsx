import handTapa from '../assets/hand-tapa.jpg';
import siyaTitle from '../assets/bg-transparent-title.svg'
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import InfoDivBullets from '../components/InfoDivBullets';

function AboutUs() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    // const descriptionList = [
    //     "Troba la terrassa ideal per tipus de menjar, ambient, ubicació... amb filtres potents que cap altra app ofereix",
    //     "Localitza al mapa terraces i consulta'n els detalls ràpidament.",
    //     "No fa bo? Cap problema, busca per tipus de coberta i que res t'arruini la betllada!",
    //     "Participa a la nostra comunitat i consulta ressenyes reals d'altres usuaris!",
    //     "Ets un negoci? Consulta" + <a href='/partners'>aqui</a> + "totes les avantatges que t'ofereix Siya per créixer."
    // ]
    const descriptionList = [
        <span>
            <Link to='/buscar-terrassa' className="text-siya-principal font-bold underline hover:text-siya-dark-green transition-colors">
                Busca
            </Link>
            {' '}per tipus de menjar, ambient, ubicació... amb filtres potents que cap altra app ofereix
        </span>,
        <span>
            <Link to='/' className="text-siya-principal font-bold underline hover:text-siya-dark-green transition-colors">
                Localitza
            </Link>
            {' '}terraces a prop teu i consulta'n els detalls ràpidament.
        </span>,
        <span>
            No fa bo? Cap problema, {' '}
            <Link to='/buscar-terrassa' className="text-siya-principal font-bold underline hover:text-siya-dark-green transition-colors">
                busca per tipus de coberta
            </Link>
            {' '}i que res t'espatlli la betllada!
        </span>,
        <span>
            <Link to={isLoggedIn ? "/perfil" : "/sign-up"} className="text-siya-principal font-bold underline hover:text-siya-dark-green transition-colors">
                Participa a la nostra comunitat
            </Link>
            {' '}i consulta ressenyes reals d'altres usuaris!
        </span>,
        <span>
            Ets un negoci? Consulta{' '}
            <Link to='/partners' className="text-siya-principal font-bold underline hover:text-siya-dark-green transition-colors">
                aquí
            </Link>
            {' '}totes les avantatges que t'ofereix Siya per créixer.
        </span>
    ];

    return (
        <div
            className='w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat py-10 shadow-inner min-h-screen'
            style={{ backgroundImage: `url(${handTapa})` }} // Dynamic background
        >
            <div className='flex flex-col justify-center items-center mx-auto w-full'>
                <div className='rounded-full bg-siya-secundario/90 flex justify-center items-center mx-auto '>
                    <img src={siyaTitle} className='w-1/3 h-1/3'></img>
                </div>
                {/* <h2 className="siyaRed-text
                system-condensed
                text-3xl
                mb-5
                mt-5
                font-extrabold text-center">
                Siya, la teva nova app de terraceo</h2> */}
                <div className='flex flex-col justify-center'>
                    <div className='w-full'>
                        <InfoDivBullets
                            list={descriptionList}
                            title={"Sí, som la app que et troba la terrassa perfecta:"}
                            customClass='bg-white/90'
                        />
                    </div>
                    {/* <div className='p-5 rounded-full bg-white'>
                        <img className='w-full h-full rounded-full' src={tapas} />
                    </div> */}
                </div>
                {/* <p className='siyaRed-text
                system-condensed
                mt-5
                m-6
                text-center
                text-pretty'>
                    hello
            </p>
            <h3 className='siyaRed-text
                system-condensed
                text-4xl
                ms-4 me-4 mb-10
                font-extrabold text-center'>Vosaltres decidiu, nosaltres la busquem.</h3> */}
                <Button
                    onClick={() => navigate("/buscar-terrassa")}
                    className={`text-primary-content text-siya-dark-green px-4 py-2 mt-3
                        m-3 mb-7 bg-gr bg-siya-secundario
                        hover:bg-siya-dark-green hover:text-siya-secundario
                        rounded-full
                        flex justify-between items-center
                        toggle-height
                        mx-auto`}>
                    Reservar taula
                </Button>



            </div>
        </div>
    )
}

export default AboutUs