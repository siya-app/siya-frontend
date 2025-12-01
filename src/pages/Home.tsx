import Hero from "../layout/Hero";
import LogInForm from "../features/login-form/LogInForm";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import '../App.css';
import WeatherFeature from "../features/weather/WeatherFeature";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ClusteredMap from "../features/map/ClusteredMap";
import { CheckIcon } from "lucide-react";

const Home = () => {
  const { terraceList } = useTerraceList();
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

  const siyaDescription: string[] = [
    "Filtra amb precisió amb un mapa pensat per decidir ràpid.",
    "Descobreix terrasses per ambient, menjar, coberta i vibes, com a cap altra app.",
    "Guarda favorits, deixa ressenyes i troba la terrassa perfecta en segons.",
    "Ets un comerç i vols ser partner? Contacta'ns i destaca entre la multitut amb etiquetes personalitzades."
  ]

  const location = useLocation();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (location.hash === '#loginForm' && terraceList.length > 0) {
      setTimeout(() => {
        const element = document.getElementById('loginForm');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location, terraceList]);

  return (
    <div className="mb-10">
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <div className="flex flex-col justify-center items-center
      m-10 text-lg text-siya-principal montserrat-siya border-2 rounded-xl p-5
      border-l- border-r-10 border-t- border-b-10 border-siya-dark-green shadow-lg hover:shadow-none
      lg:w-2/3 lg:mx-auto
      ">
        <div className="">
          <h3 className="text-3xl m-2 mb-5 font-bold text-left">Siya eleva el teu terraceo ;)</h3>
          <ul className="flex flex-col w-full text-left text-balance">
            {siyaDescription.map((p: string, index) => (
              <li key={index} className="list-none flex items-start gap-3 mb-2">
                <CheckIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                <span className="leading-snug mb-2">{p}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>
        <div className="m-8 relative map-container w-3/4 lg:w-1/2">
          <ClusteredMap />
          <div className="absolute -top-7 -right-7 z-1">
            <WeatherFeature />
          </div>
        </div>
      </div>

      <TerraceSlider
        orderBy="nearby"
        list={terraceList}
      />
      <TerraceSlider
        orderBy="rating"
        list={terraceList}
      />
      <section id="loginForm">
        {user && isLoggedIn ?
          <></> : <LogInForm onLoginSuccess={(user) => setUser(user)} />}
      </section>
    </div>
  );
};

export default Home;
