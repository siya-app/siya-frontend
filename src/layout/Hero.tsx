import WeatherFeature from "../features/weather/WeatherFeature";
import { useAuth } from "../context/useAuth";

const Hero = () => {
    const user = useAuth();
    return (
        <div>
            <div className="flex flex-col">
                <div className=" flex-row ms-3">
                    <img src="src/assets/siya-title-bg-transp.svg"
                    className="
                    w-40
                    h-40" />
                    <p className="
                    text-xl
                    text-siya-principal
                    montserrat-siya
                    "> {user && user.user ? `Hola ${user.user.name}!` : "La teva nova app de terraceo."}</p>
                </div>
                <div className="mx-auto">
                    <WeatherFeature />
                </div>
            </div>
            <p className="
                text-3xl
                text-siya-principal
                montserrat-siya
                ms-8
                ">La teva nova app de <i>terraceo</i> </p>
        </div>
    );
}

export default Hero;