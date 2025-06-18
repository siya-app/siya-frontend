import { useMemo, useState } from "react";
// import { uselist } from "../../hooks/uselist";
import ScrollSnap from "../../components/slider/ScrollSnap";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import BlobCard from "./BlobCard";
import redBlob from '../../assets/blobs/red-blob.png';
import type { OrderByOption } from "../../types/types";
interface TerraceSliderProps {
    orderBy?: OrderByOption;
    list: CustomTerraceType[];
}


function TerraceSlider({ orderBy = 'default', list }: TerraceSliderProps) {

    // const { list } = uselist();
    //TODO: near_you terraces logic

    const sortedTerraces = useMemo(() => {
        const terraces = Array.isArray(list) ? [...list] : [];
    
        switch (orderBy) {
            case 'rating':
                return terraces.sort((a, b) => (b.average_rating ?? 0) - (a.average_rating ?? 0));
    
            case 'is_claimed':
                return terraces.sort((a, b) => (a.average_rating ?? 0) - (b.average_rating ?? 0));
    
            case 'near_you':
                return terraces.sort((a, b) => a.business_name.localeCompare(b.business_name));
    
            case 'default':
            default:
                return terraces;
        }
    }, [list, orderBy]);


    return (
        <div className="mt-5">
            <ScrollSnap>
                {sortedTerraces.map((terrace: CustomTerraceType) => (
                    <BlobCard
                        key={terrace.cadastro_ref}
                        className="snap-start shrink-0 w-[60%] sm:w-[35%]"
                        picture={terrace.profile_pic ?? ""}
                        businessName={terrace.business_name}
                        rating={terrace.average_rating ?? 0}
                        blob={redBlob}
                        id={terrace.id}
                    />
                ))}
            </ScrollSnap>
        </div>
        //carleeees aquiiii l'id ❤️✨

    )
}

export default TerraceSlider