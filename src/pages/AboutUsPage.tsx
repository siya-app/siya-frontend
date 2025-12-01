import tapas from '../assets/tapas.jpg'
import siyaTitle from '../assets/bg-transparent-title.svg'
import Button from '../components/Button';
import { Link} from 'react-router-dom';
import InfoDivBullets from '../components/InfoDivBullets';

function AboutUs() {

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
            <Link to='/buscar-terrassa#mapFilterPage' className="text-siya-principal font-bold underline hover:text-siya-dark-green transition-colors">
                Localitza
            </Link>
            {' '}terraces al mapa i consulta'n els detalls ràpidament.
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
        <div className='flex flex-col justify-center items-center mx-auto'>
            <img src={siyaTitle} className='w-1/3 h-1/3 mb-5'></img>
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
                        title={"Perquè buscar terrassa no hauria de ser un drama..."}
                    />
                </div>
                <div className='p-5 rounded-full bg-white'>
                    <img className='w-full h-full rounded-full' src={tapas} />
                </div>
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
                className={`text-primary-content px-4 py-2 mt-3
                        m-3 mb-7 bg-gr bg-siya-principal
                        text-white rounded-full
                        flex justify-between items-center
                        toggle-height
                        animate-pulse
                        mx-auto`}>
                Reservar taula
            </Button>



        </div>
    )
}

export default AboutUs