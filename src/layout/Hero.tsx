import WeatherFeature from "../features/weather/WeatherFeature";
import { useAuth } from "../context/useAuth";
import siyaTitle from '../assets/bg-transparent-title-600x300.png'

const Hero = () => {
    const user = useAuth();
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-[90%] text-center">
                <img src={siyaTitle} className="w-full mx-auto" alt="Siya Terraceo"/>
                <div className="flex justify-center">
                    <p className="ms-4 text-3xl text-siya-principal
                    montserrat-siya text-left inline-block">
                        {user?.user 
                            ? `Hola, ${user.user.name}!` 
                            : <>La teva nova app de <i>terraceo</i>.</>
                        }
                    </p>
                </div>
            </div>
            {/* <div className="mx-auto">
                <WeatherFeature />
            </div> */}
        </div>
    );
}

export default Hero;