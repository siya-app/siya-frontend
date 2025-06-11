import WeatherFeature from "../features/weather/WeatherFeature";

const Hero = () => {
    return (
        <div className="flex bg-gray-100">
            <div className="">
                <img src="src/assets/siya-title-bg-transp.svg"
                className="
                w-25
                h-25" />
                <p className="
                text-xl
                text-siya-principal
                ">La teva nova app de terraceo.</p>
            </div>
            <div className="mx-auto">
                <WeatherFeature />
            </div>
        </div>
    );
}

export default Hero;