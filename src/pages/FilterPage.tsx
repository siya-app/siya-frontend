
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import Map from "../features/map/MapFeature";
import { BlobCarousel } from "../components/BlobList";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";

const FilterPage = () => {

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { terraceList } = useTerraceList();
  const [filteredTerraces, setFilteredTerraces] = useState<CustomTerraceType[]>([]);


  // const handleSearch = (query: string) => {
  //   console.log("Searching for:", query);
  //   // API call or filtering logics in here

  //   // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  //   // const [terraces, setTerraces] = useState<Terrace[]>([]); // From API or context

  //   // // Filter terraces based on selected filters
  //   // const filteredTerraces = filterTerraces(terraces, selectedFilters);

  //   // const handleFilterToggle = (filter: string) => {
  //   //   setSelectedFilters(prev =>
  //   //     prev.includes(filter)
  //   //       ? prev.filter(f => f !== filter)
  //   //       : [...prev, filter]
  //   //   );
  //   // };
  // };

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
      <TerraceSlider
      list={terraceList}
      />
    </div>
  );
};

export default FilterPage;
