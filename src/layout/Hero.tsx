import WeatherFeature from "../features/weather/WeatherFeature";
import {useState, useEffect} from 'react'
import siyaTitle from '../assets/siya-title-svg.svg'

interface User {
  name: string;
  email: string;
}

const Hero = () => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkUser();

    // Observa si el usuario se loguea en tiempo real (opcional: polling)
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      // Solo actualiza si hay un cambio real
      setUser(prev => JSON.stringify(prev) !== JSON.stringify(parsedUser) ? parsedUser : prev);
    }, 500); // puedes ajustar el intervalo

    return () => clearInterval(interval);
  }, []);
    
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-[90%] text-center">
                <img src={siyaTitle} className="w-full mx-auto" alt="Siya Terraceo"/>
                <div className="flex justify-center">
                    <p className="ms-4 text-3xl text-siya-principal
                    montserrat-siya text-left inline-block">
                        {user
                            ? `Hola, ${user.name}!` 
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