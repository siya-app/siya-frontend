import { useMemo } from "react";
import { useTerraceList } from "../../hooks/useTerraceList";
import ScrollSnap from "../../components/slider/ScrollSnap";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import BlobCard from "./BlobCard";
import redBlob from '../../assets/blobs/red-blob.png';
import type { OrderByOption } from "../../types/types";
interface TerraceSliderProps {
    orderBy?: OrderByOption;
}


function TerraceSlider({ orderBy = 'default' }: TerraceSliderProps) {

    const { terraceList } = useTerraceList();

    const sortedTerraces = useMemo(() => {
        const terraces = [...terraceList];
    
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
    }, [terraceList, orderBy]);


    return (
        <div className="mt-5 mb-5">
            <ScrollSnap>
                {sortedTerraces.map((terrace: CustomTerraceType) => (
                    <BlobCard
                        key={terrace.cadastro_ref}
                        className="snap-start shrink-0 w-[60%] sm:w-[35%]"
                        picture={terrace.profile_pic ?? ""}
                        businessName={terrace.business_name}
                        rating={terrace.average_rating ?? 0}
                        blob={redBlob}
                    />
                ))}
            </ScrollSnap>
        </div>
    )
}

export default TerraceSlider