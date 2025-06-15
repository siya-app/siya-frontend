import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
//import TerraceList from "../features/terraces/TerracesList";
import LogInForm from "../features/login-form/LogInForm";


const Home = () => {
  return (
    <div >
      <Hero />
      <Map />
      {/* <TerraceList /> */}
      <LogInForm></LogInForm>
    </div>
  );
};

export default Home;
