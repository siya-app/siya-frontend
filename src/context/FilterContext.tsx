import { createContext, useContext, useState, useEffect } from "react";
import { useTerraceList } from "../hooks/useTerraceList";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";


type FilterContextType = {
    selectedTags: string[],
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    filteredTerraces: CustomTerraceType[];
    resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const { terraceList } = useTerraceList();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTerraces, setFilteredTerraces] = useState<CustomTerraceType[]>([]);

    // useEffect(() => {
    //     const filtered = terraceList.filter((terrace) => {
    //         const tagGroups = Object.values(terrace.tags || {});
    //         const allTags = tagGroups.flat();

    //         const matchesTags = selectedTags.length === 0 ||
    //         selectedTags.every(tag => allTags.includes(tag));

    //         const matchesSearch = searchQuery === '' ||
    //         terrace.business_name?.toLowerCase().includes(searchQuery.toLowerCase());

    //         return matchesTags && matchesSearch;
    //     });

    //     setFilteredTerraces(filtered);
    // }, [selectedTags, searchQuery, terraceList]);

   useEffect(() => {
    if (!Array.isArray(terraceList)) return;

    const filtered = terraceList.filter((terrace) => {
        const tagGroups = Object.values(terrace.tags || {});
        const allTags = tagGroups.flat();

        const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.every(tag => allTags.includes(tag));

        const matchesSearch =
            searchQuery === '' ||
            terrace.business_name?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTags && matchesSearch;
    });

    setFilteredTerraces(filtered);
}, [selectedTags, searchQuery, terraceList]);


    const resetFilters = () => {
        setSelectedTags([]);
        setSearchQuery('');
    }

    return (
        <FilterContext.Provider value={{
            selectedTags,
            setSelectedTags,
            searchQuery,
            setSearchQuery,
            filteredTerraces,
            resetFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error("useFilterContext must be used within FilterProvider");
    return context;
};