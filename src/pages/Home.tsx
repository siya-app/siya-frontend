import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
//import TerraceList from "../features/terraces/TerracesList";
import LogInForm from "../features/login-form/LogInForm";
import TerraceSlider from "../components/slider/TerraceSlider";
import TerraceClaim from "../features/terrace-claim/TerraceClaim";
import { useTerraceList } from "../hooks/useTerraceList";
import '../App.css';
import WeatherFeature from "../features/weather/WeatherFeature";
import { useAuth } from "../context/useAuth";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { terraceList } = useTerraceList();
  const user = useAuth();
  const isLoggedIn = !!localStorage.getItem('token');

  const location = useLocation();

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
      <Hero />
      <div className="m-8 relative map-container">  {/* Added relative positioning */}
        <Map
        terraces={terraceList}
        />
        <div className="absolute top-1 right-1 z-1">  {/* Weather floating position */}
          <WeatherFeature />
        </div>
      </div>
      <TerraceSlider
        orderBy="nearby"
        list={terraceList}
      />
      <TerraceSlider
        orderBy="is_claimed"
        list={terraceList}
      />
      <section id="loginForm">
        {user?.user && isLoggedIn ?
          <></> : <LogInForm />}
      </section>
    </div>
  );
};

export default Home;
