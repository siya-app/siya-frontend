import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
//import TerraceList from "../features/terraces/TerracesList";
import LogInForm from "../features/login-form/LogInForm";
import SignUpForm from "../features/signup-form/SignUpForm";
import TerraceSlider from "../components/slider/TerraceSlider";
import TerraceClaim from "../features/terrace-claim/TerraceClaim";



const Home = () => {

  return (
    <div >
      <Hero />
      <Map />
      <TerraceSlider
      orderBy="rating"/>
      <LogInForm></LogInForm>
      <SignUpForm></SignUpForm>
      <TerraceClaim></TerraceClaim>
    </div>
  );
};

export default Home;
