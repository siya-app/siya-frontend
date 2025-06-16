import ScrollSnap from "../components/slider/ScrollSnap";
import { useTerraceList } from "../hooks/useTerraceList";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";
import BlobCard from '../components/slider/BlobCard'
import redBlob from '../assets/blobs/red-blob.png'
import SearchBar from "../components/SearchBar";
import { useState, useMemo } from "react";
import { getBlobs } from "../services/blobList.service";
import { Map } from "lucide-react";
import { BlobCarousel } from "../components/BlobList";
// import { BlobList } from "../components/BlobList";
import TerraceSlider from "../components/slider/TerraceSlider";

const FilterPage = () => {
  // const { terraceList } = useTerraceList();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // API call or filtering logics in here

    // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    // const [terraces, setTerraces] = useState<Terrace[]>([]); // From API or context

    // // Filter terraces based on selected filters
    // const filteredTerraces = filterTerraces(terraces, selectedFilters);

    // const handleFilterToggle = (filter: string) => {
    //   setSelectedFilters(prev =>
    //     prev.includes(filter)
    //       ? prev.filter(f => f !== filter)
    //       : [...prev, filter]
    //   );
    // };
  };

  return (
    <div>
      <h1 className="siyaRed-text
      system-condensed
      text-4xl
      m-2
      mt-5
      font-extrabold text-center">
        Ganes de terraceo? ;)</h1>
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <Map></Map>

      {(['food', 'emotional', 'dietary', 'cover', 'placement'] as const).map(type => (
          <BlobCarousel 
            key={type}
            type={type}
          />
        ))}
      <TerraceSlider/>
    </div>
  );
};

export default FilterPage;
