import blueSky from '../assets/blue-sky.jpg';
import siyaLogo from '../../public/bg-transp-logo-siya 1.svg';
import siyaTitle from '../assets/bg-transparent-title-600x300.png'
import siyaCircleBlue from '../assets/siya-circle-blue.png';
import siyaCircleYellow from '../assets/siya-circle-yellow.png';
import siyaCricleGrey from '../assets/siya-circle-grey.png';
import siyaPosterBlue from '../assets/bg-blue-siya-poster.png';

import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function AboutUs() {

    const navigate = useNavigate();


    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className="siyaRed-text
                system-condensed
                text-3xl
                mb-5
                mt-5
                font-extrabold text-center">
                Més temps per vosaltres :)</h2>
            <div>
                <img src={blueSky} />
            </div>
            <p className='siyaRed-text
                system-condensed
                mt-5
                m-6
                text-center
                text-pretty'>Ens hem proposat una idea molt boja. I si en comptes de passar-nos mitja tarda buscant terrassa,
                la reservem amb antelació?
            </p>
            <h3 className='siyaRed-text
                system-condensed
                text-4xl
                m-2
                ms-4 me-4
                font-extrabold text-center'>Vosaltres decidiu, nosaltres ho busquem.</h3>
            <Button
                onClick={() => navigate("/buscar-terrassa")}
                className={`text-primary-content px-4 py-2 mt-3
                        m-3 bg-gr bg-siya-principal text-white rounded-full
                        flex justify-between items-center
                        toggle-height
                
                        mx-auto`}
            >
                Reservar taula
            </Button>
            
            <img src={siyaTitle} className='w-[80%] mb-5'></img>
            

        </div>
    )
}

export default AboutUs