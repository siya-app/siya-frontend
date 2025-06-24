import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
//import TerraceList from "../features/terraces/TerracesList";
import LogInForm from "../features/login-form/LogInForm";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import '../App.css';
import WeatherFeature from "../features/weather/WeatherFeature";
import { useLocation } from "react-router-dom";
import { useEffect , useState} from "react";

const Home = () => {
  const { terraceList } = useTerraceList();
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

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
        orderBy="rating"
        list={terraceList}
      />
      <section id="loginForm">
        {user && isLoggedIn ?
          <></> : <LogInForm onLoginSuccess={(user) => setUser(user)}/>}
      </section>
    </div>
  );
};

export default Home;
