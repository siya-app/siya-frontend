import blueSky from '../assets/blue-sky.jpg';
import siyaLogo from '../../public/bg-transp-logo-siya 1.svg';
import siyaTitle from '../assets/bg-transparent-title-600x300.png'

function AboutUs() {
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
                m-2
                mt-5
                text-center
                text-pretty'>Ens hem proposat una idea molt boja. I si en comptes de passar-nos mitja tarda buscant terrassa,
                la reservem amb antelació?
            </p>
            <h3 className='siyaRed-text
                system-condensed
                text-3xl
                m-2
                mb-5
                font-extrabold text-center'>Vosaltres decidiu, nosaltres ho busquem.</h3>
                <img src={siyaLogo} className='w-1/2 justify-center'></img>
            <img src={siyaTitle} className='w-1/3'></img>

        </div>
    )
}

export default AboutUs