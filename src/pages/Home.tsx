import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
//import TerraceList from "../features/terraces/TerracesList";
import LogInForm from "../features/login-form/LogInForm";
import TerraceSlider from "../components/slider/TerraceSlider";
import TerraceClaim from "../features/terrace-claim/TerraceClaim";
import { useTerraceList } from "../hooks/useTerraceList";




const Home = () => {
  const { terraceList } = useTerraceList();

  return (
    <div >
      <Hero />
      <div className="m-8">
        <Map />
      </div>
      <TerraceSlider
        orderBy="nearby"
        list={terraceList}
      />
      <TerraceSlider
        orderBy="is_claimed"
        list={terraceList}
      />
      <LogInForm></LogInForm>
    </div>
  );
};

export default Home;
