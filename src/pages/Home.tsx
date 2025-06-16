import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
//import TerraceList from "../features/terraces/TerracesList";
import LogInForm from "../features/login-form/LogInForm";
import SignUpForm from "../features/signup-form/SignUpForm";



const Home = () => {

  return (
    <div >
      <Hero />
      {/* <Map /> */}
      
      <LogInForm></LogInForm>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default Home;
