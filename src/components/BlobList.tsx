import ScrollSnap from "./slider/ScrollSnap";
import { getBlobs } from "../services/blobList.service";
import { BLOB_TRANSLATIONS } from "../services/blobList.service";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";
import { useState } from "react";
import SliderButton from "./slider/SliderButton";

type BlobType = 'cover' | 'dietary' | 'emotional' | 'food' | 'placement';

interface BlobCarouselProps {
    type: BlobType;
    selectedTags: string[],
    onToggleTag: (id: string) => void,
    // selectedFilters: string[];
    // onFilterToggle: (filter: string) => void;
    // filteredTerraces: CustomTerraceType[];
}

export function BlobCarousel({
    type,
    selectedTags,
    onToggleTag
}: BlobCarouselProps) {

    // const [selectedTags, setSelectedTags] = useState<string[]>([]);


    const toggleSelection = (id: string) => {
        onToggleTag(id);
    };


    const blobs: Record<BlobType, Record<string, string>> = getBlobs();
    const translations = BLOB_TRANSLATIONS[type];
    // const categoryTitle = BLOB_TRANSLATIONS.categories[type];

    return (
        <div className="shadow-siya-terciario flex flex-col justify-start">
            {/* <h2 className="text-lg text-siya-dark-green font-semibold ms-3 mb-2 mt-2 system-sans">{categoryTitle}</h2> */}
            <ScrollSnap>
                {Object.entries(blobs[type]).map(([id, src]) => (

                    <div key={id} className="snap-start shrink-0 w-[5em] mx-1">
                        <div className={"flex flex-col justify-start items-center pb-2"}>
                            <img
                                src={src}
                                alt={translations[id as keyof typeof translations]}
                                className="w-20 h-15 object-contain"
                            />
                            <SliderButton
                                key={`button-${id}`}
                                onClick={() => toggleSelection(id)}
                                tagName={translations[id as keyof typeof translations]}
                                id={id}
                                selectedTags={selectedTags}
                            />
                        </div>
                    </div>
                ))}
            </ScrollSnap>

        </div>
    );
}