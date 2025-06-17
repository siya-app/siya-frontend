import ScrollSnap from "./slider/ScrollSnap";
import { getBlobs } from "../services/blobList.service";
import { BLOB_TRANSLATIONS } from "../services/blobList.service";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";
import { useState } from "react";

type BlobType = 'cover' | 'dietary' | 'emotional' | 'food' | 'placement';

interface BlobCarouselProps {
    type: BlobType;
    // selectedFilters: string[];
    // onFilterToggle: (filter: string) => void;
    // filteredTerraces: CustomTerraceType[];
}

export function BlobCarousel({
    type,
    // selectedFilters,
    // onFilterToggle,
    // filteredTerraces
}: BlobCarouselProps) {

    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        
    }

    const blobs: Record<BlobType, Record<string, string>> = getBlobs();
    const translations = BLOB_TRANSLATIONS[type];
    const categoryTitle = BLOB_TRANSLATIONS.categories[type];

    return (
        <div className="shadow-lg shadow-siya-terciario mb-5 pb-2 flex flex-col justify-start">
            <h2 className="text-lg text-siya-dark-green font-semibold ms-3 mb-3 system-sans">{categoryTitle}</h2>
            <ScrollSnap>
                {Object.entries(blobs[type]).map(([id, src]) => (
                    <div key={id} className="snap-start shrink-0 w-[5em] mx-1">
                        <div className={"flex flex-col justify-start items-center p-2" }>
                            <img
                                src={src}
                                alt={translations[id as keyof typeof translations]}
                                className="w-20 h-20 object-contain"
                            />
                            <button className="text-xs text-center
                        capitalize siya2-bg rounded-xl siya3-text
                        p-1.5 shadow-md shadow-gray-600
                        "> {/* Added label */}
                                {translations[id as keyof typeof translations]}
                            </button>
                        </div>
                    </div>
                ))}
            </ScrollSnap>

        </div>
    );
}