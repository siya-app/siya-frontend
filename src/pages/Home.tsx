import Hero from "../layout/Hero";
import Map from "../features/map/MapFeature";
import TerraceList from "../features/terraces/TerracesList";

const Home = () => {
  return (
    <div >
      <Hero />
      <Map />
      <TerraceList />
    </div>
  );
};

export default Home;
