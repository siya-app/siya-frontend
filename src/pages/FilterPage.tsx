import ScrollSnap from "../components/slider/ScrollSnap";

const FilterPage = () => {
  return (
    <div>
      <h1>Pàgina de Filtre</h1>
      <div className="relative">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md">◀</button>
        <ScrollSnap />
        <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md">▶</button>
      </div>
    </div>
  );
};

export default FilterPage;
