import WeatherFeature from "../features/weather/WeatherFeature";

const Hero = () => {
    return (
        <div className="flex flex-col">
            <div className=" flex-row ms-3">
                <img src="src/assets/siya-title-bg-transp.svg"
                className="
                w-40
                h-40" />
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