import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
//import TerraceList from "../features/terraces/TerracesList";
import LogInForm from "../features/login-form/LogInForm";
import TerraceSlider from "../components/slider/TerraceSlider";




const Home = () => {

  return (
    <div >
      <Hero />
      <Map />
      <TerraceSlider
      orderBy="rating"/>
      <LogInForm></LogInForm>
    </div>
  );
};

export default Home;
