
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import Map from "../features/map/MapFeature";
import { BlobCarousel } from "../components/BlobList";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";

//restaurants with inserted tags:
// china garden - url: 0032e31f-f65f-459d-bfad-ab5b38fd3164/tags
// can lampazas - url: 003e3afe-ebe0-400f-9c93-9cadec1633d2/tags
// champanillo - url: 12c24ece-698e-42f3-b344-622a008eb221/tags
// divina stefy - url: 263bd00c-b105-4ca2-8230-27372a5df6a4/tags
// el tomas de sarria - url: 680fbbea-ccb3-4b3d-980e-406d1fca06b5/tags
// xix kebab - url: 8f87f1e9-85fc-4b85-b408-25dbbe92aac2/tags
// la terraza miro - url: a93749f0-7efe-4266-ab43-9e80234cb701/tags
// nori sushi&cocktails - url: abc19588-83cd-4053-8d13-5f75de5e54f3/tags
//


const FilterPage = () => {

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { terraceList } = useTerraceList();
  const [filteredTerraces, setFilteredTerraces] = useState<CustomTerraceType[]>([]);


  const toggleSelection = (id: string) => {

    setSelectedTags((prev) => {
        const updated = prev.includes(id)
            ? prev.filter(tag => tag !== id)
            : [...prev, id];

        console.log("updated selectedTags:", updated);
        return updated;
    });

};

useEffect(() => {

  setFilteredTerraces(() => {
    const filteredTerraces = terraceList.filter((terrace) => {
      const tagGroups = Object.values(terrace.tags);
      const allTags = tagGroups.flat();
    
      return selectedTags.every(tag => allTags.includes(tag));
    });

    return filteredTerraces;
  });

}, [selectedTags])



  return (
    <div>
      <h1 className="siyaRed-text
      system-condensed
      text-4xl
      m-2
      mt-5
      font-extrabold text-center">
        Ganes de terraceo? ;)</h1>
      {/* <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={handleSearch}
      /> */}
      <Map />
      {(['food', 'emotional', 'placement', 'cover', 'dietary'] as const).map(type => (
        <BlobCarousel
          key={type}
          type={type}
          selectedTags={selectedTags}
          onToggleTag={toggleSelection}
        />
      ))}
  {selectedTags.length === 0 ? (
  <TerraceSlider list={terraceList} />
) : filteredTerraces.length > 0 ? (
  <TerraceSlider list={filteredTerraces} />
) : (
  <p className="text-center text-lg text-gray-500 mt-4">No hem trobat terrasses</p>
)}
    </div>
  );
};

export default FilterPage;
