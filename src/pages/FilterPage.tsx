
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import Map from "../features/map/MapFeature";
import { BlobCarousel } from "../components/BlobList";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BLOB_TRANSLATIONS } from "../services/blobList.service";
import SliderButton from "../components/slider/SliderButton";


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
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryTitle = (type: keyof typeof BLOB_TRANSLATIONS.categories) => BLOB_TRANSLATIONS.categories[type];

  const toggleSelection = (id: string) => {
    setSelectedTags((prev) => {
      const updated = prev.includes(id)
        ? prev.filter(tag => tag !== id)
        : [...prev, id];

      console.log("updated selectedTags:", updated);
      return updated;
    });

  };

  // useEffect(() => {
  //   setFilteredTerraces(() => {
  //     const filteredTerraces = terraceList.filter((terrace) => {
  //       if (!terrace.tags) return false;
  //       const tagGroups = Object.values(terrace.tags);
  //       const allTags = tagGroups.flat();

  //       return selectedTags.every(tag => allTags.includes(tag));
  //     });
  //     return filteredTerraces;
  //   });
  // }, [selectedTags, terraceList]);

  // useEffect(() => {
  //   if (searchQuery === '') {
  //     setFilteredTerraces(terraceList);
  //     return;
  //   }

  //   const searchedTerraces = terraceList.filter((terrace) =>
  //     terrace.business_name?.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   setFilteredTerraces(searchedTerraces);
  // }, [searchQuery, terraceList]);

  const resetFilters = (list: string[]) => {
    setSelectedTags((prev) => prev = []);
    setSearchQuery('')
  }

  // const filterBySearch = (terraces: CustomTerraceType[], query: string) => {
  //   if (!query || query === '') return terraces;

  //   return terraces.filter((terrace) =>
  //     terrace.business_name?.toLowerCase().includes(query.toLowerCase())
  //   );
  // }

  useEffect(() => {
    const filtered = terraceList.filter((terrace) => {
      // Tag filtering
      const tagGroups = Object.values(terrace.tags || {});
      const allTags = tagGroups.flat();
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => allTags.includes(tag));

      // Search filtering
      const matchesSearch = searchQuery === '' || terrace.business_name?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTags && matchesSearch;
    });

    setFilteredTerraces(filtered);
  }, [selectedTags, searchQuery, terraceList]);


  return (
    <div>
      <h1 className="siyaRed-text
      system-condensed
      text-4xl

      mt-5
      font-extrabold text-center">
        Ganes de terraceo? ;)</h1>
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}

      />

      {(['food', 'emotional', 'placement', 'cover', 'dietary'] as const).map((type: keyof typeof BLOB_TRANSLATIONS.categories) => (
        <div key={type} className="shadow-md
  border-l- border-r-4 border-t- border-b-4 border-siya-dark-green
  siyaDark-text m-2 mt-3 bg-gray-50
  shadow-neutral-300 my-2 rounded-2xl overflow-hidden">
          <div
            onClick={() => setOpenSection(prev => prev === type ? null : type)}
            className="cursor-pointer collapse-title bg-primary
      text-primary-content px-4 py-2 capitalize flex justify-between items-center"
          >
            {categoryTitle(type)}
            {openSection === type
              ? <FaChevronUp className="siyaDark-text" />
              : <FaChevronDown className="siyaDark-text" />
            }
          </div>

          {openSection === type && (
            <div className="collapse-content siya3-text px-4 py-2 ">
              <BlobCarousel
                type={type}
                selectedTags={selectedTags}
                onToggleTag={toggleSelection}
              />
            </div>
          )}
        </div>
      ))}
      {(selectedTags.length > 0 || searchQuery !== '') ? (
        filteredTerraces.length > 0 ? (
          <TerraceSlider
          orderBy="nearby"
          list={filteredTerraces}
          />
        ) : (
          <p className="text-center text-lg text-gray-500 mt-4">No s'han trobat terrasses</p>
        )
      ) : (
        <TerraceSlider
        orderBy="nearby"
        list={terraceList}
        />
      )}
      <div className="flex justify-center">
        <SliderButton
          onClick={() => resetFilters([])}
          selectedTags={selectedTags}
          tagName="Reset"
        />
      </div>
      <div className="m-8">
        <Map />
      </div>
    </div>
  );
};

export default FilterPage;
