import FetchWeather from "../features/weather/Weather";

const Hero = () => {
    return (
        <div className="flex bg-gray-100">
            <div className="mx-auto">
                <img src="src/assets/siya-title-bg-transp.svg" className="mx-auto w-30 h-30" />
                <p className="text-lg">La teva nova app de terraceo.</p>
            </div>
            <div className="mx-auto">
                <FetchWeather />
            </div>
        </div>
    );
}

export default Hero;