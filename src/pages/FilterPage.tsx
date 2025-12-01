
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import Map from "../features/map/MapFeature";
import { BlobCarousel } from "../components/BlobList";
import TerraceSlider from "../components/slider/TerraceSlider";
import { useTerraceList } from "../hooks/useTerraceList";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BLOB_TRANSLATIONS } from "../services/blobList.service";
import SliderButton from "../components/slider/SliderButton";
import { useFilterContext } from "../context/FilterContext";

//restaurants with inserted tags:
// china garden - url: 0032e31f-f65f-459d-bfad-ab5b38fd3164/tags
// can lampazas - url: 003e3afe-ebe0-400f-9c93-9cadec1633d2/tags
// champanillo - url: 12c24ece-698e-42f3-b344-622a008eb221/tags
// divina stefy - url: 263bd00c-b105-4ca2-8230-27372a5df6a4/tags
// el tomas de sarria - url: 680fbbea-ccb3-4b3d-980e-406d1fca06b5/tags
// xix kebab - url: 8f87f1e9-85fc-4b85-b408-25dbbe92aac2/tags
// la terraza miro - url: a93749f0-7efe-4266-ab43-9e80234cb701/tags
// nori sushi&cocktails - url: abc19588-83cd-4053-8d13-5f75de5e54f3/tags

const FilterPage = () => {

  const { terraceList } = useTerraceList();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const {
    selectedTags,
    setSelectedTags,
    searchQuery,
    setSearchQuery,
    filteredTerraces,
    resetFilters,
  } = useFilterContext();

  const categoryTitle = (type: keyof typeof BLOB_TRANSLATIONS.categories) =>
    BLOB_TRANSLATIONS.categories[type];

  const toggleSelection = (id: string) => {
    setSelectedTags((prev) => {
      const updated = prev.includes(id)
        ? prev.filter(tag => tag !== id)
        : [...prev, id];

      console.log("updated selectedTags:", updated);
      return updated;
    });

  };


  return (
    <div className="mb-20">
      <h2 className="siyaRed-text
      system-condensed
      text-4xl
      mt-5
      font-extrabold text-center">
        Ganes de terraceo? ;)</h2>
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}

      />
      <div className="lg:flex lg:flex-row lg:items-start lg:gap-6 lg:px-10 lg:mt-8">
        <div className="w-full lg:w-2/4">
          {(['food', 'emotional', 'placement', 'cover', 'dietary'] as const).map((type: keyof typeof BLOB_TRANSLATIONS.categories) => (
            <div key={type}
              className="shadow-md mx-auto
          border-l- border-r-4 border-t- border-b-4 border-siya-dark-green
          siyaDark-text m-2 mt-3 bg-gray-50
          shadow-neutral-300 my-2 rounded-2xl overflow-hidden
          md:w-2/3
          ">
              <div
                onClick={() => setOpenSection(prev => prev === type ? null : type)}
                className="cursor-pointer
              collapse-title bg-primary
              text-primary-content px-4 py-2 capitalize
              flex justify-between items-center"
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
        </div>
        <div className="hidden lg:block lg:w-2/4 lg:h-[600px] lg:sticky lg:top-4 rounded-xl overflow-hidden">
          <Map terraces={filteredTerraces} />
        </div>
      </div>
      {(selectedTags.length > 0 || searchQuery !== '') ? (
        filteredTerraces.length > 0 ? (
          <>
            <TerraceSlider
              list={filteredTerraces}
            />

            <TerraceSlider
              orderBy="nearby"
              list={filteredTerraces}
            />
          </>

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
          onClick={() => resetFilters()}
          selectedTags={selectedTags}
          tagName="Reset"
          customClass="ps-4 pe-4 border-2"
        />
      </div>
      <div className="m-8 md:w-2/3 flex flex-col justify-center items-center mx-auto md:min-h-96 lg:hidden">
        <Map
          terraces={filteredTerraces}
        />
      </div>
    </div>
  );
};

export default FilterPage;
