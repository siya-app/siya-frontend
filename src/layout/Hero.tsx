import WeatherFeature from "../features/weather/WeatherFeature";
import { useAuth } from "../context/useAuth";

const Hero = () => {
    const user = useAuth();
    return (
        <div className="flex bg-gray-100">
            <div className=" ms-3">
                <img src="src/assets/siya-title-bg-transp.svg"
                className="
                w-25
                h-25" />
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
    );
}

export default Hero;