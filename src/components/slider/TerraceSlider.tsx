import { useMemo } from "react";
import { useTerraceList } from "../../hooks/useTerraceList";
import ScrollSnap from "../../components/slider/ScrollSnap";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import BlobCard from "./BlobCard";
import redBlob from '../../assets/blobs/red-blob.png'

const { terraceList } = useTerraceList();

const sortedTerraces = useMemo(() => {
    return [...terraceList].sort((a, b) => (b.average_rating ?? 0) - (a.average_rating ?? 0));
}, [terraceList]);



function TerraceSlider() {
    return (
        <div>
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