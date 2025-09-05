import { useMemo, useState, useContext } from "react";
// import { uselist } from "../../hooks/uselist";
import ScrollSnap from "../../components/slider/ScrollSnap";
import type { CustomTerraceType, TerraceWithDistance } from "../../types/zod/customTerrace-schema";
import BlobCard from "./BlobCard";
import redBlob from '../../assets/blobs/red-blob.png';
import type { OrderByOption } from "../../types/types";
import { filterByProximity } from "../../utils/filterByProximity";
// import { UserLocationContext } from "../../context/UserLocationContext";
import { useUserLocation } from "../../hooks/useUserLocation";
import { calculateDistance } from "../../utils/calculateDistance";
import { HiArrowSmRight } from "react-icons/hi";

interface TerraceSliderProps {
    orderBy?: OrderByOption;
    list: CustomTerraceType[];
}


function TerraceSlider({ orderBy = 'default', list }: TerraceSliderProps) {

    const { location } = useUserLocation();

    const shuffleArray = (array: CustomTerraceType[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const sortedTerraces = useMemo(() => {
        const terraces = Array.isArray(list) ? [...list] : [];

        switch (orderBy) {
            case 'rating':
                return terraces.sort((a, b) => (b.average_rating ?? 0) - (a.average_rating ?? 0));

            case 'is_claimed':
                return terraces.sort((a, b) => (a.average_rating ?? 0) - (b.average_rating ?? 0));

            case 'nearby':
                if (!location) return [];
                const nearbyTerraces = filterByProximity({
                    maxDistance: 1, // you can change this to 2 or 3
                    terraces: terraces,
                    location: location ?? null,
                    calculateDistance: calculateDistance
                }) as TerraceWithDistance[];

                console.log("📍 Nearby terraces within 1km:", nearbyTerraces.map(t => ({
                    name: t.business_name,
                    distance: t.distance?.toFixed(2)
                })));

                return nearbyTerraces ? nearbyTerraces : 'No hem trobat terrasses a prop...';

            case 'default':
            default:
                return shuffleArray(terraces);
        }
    }, [list, orderBy]);

    const titleByOrder = useMemo(() => {
        switch (orderBy) {
            case 'rating':
                return 'Les més valorades';
            case 'is_claimed':
                return 'Et recomanem';
            case 'nearby':
                return 'A prop teu';
            default:
                return 'Descobrir';
        }
    }, [orderBy]);


    return (
        <div className="mt-5">
            <h2 className="montserrat-siya text-xl
            m-2 ms-3 siyaDark-text">{titleByOrder}
                <span className="inline-icon"><HiArrowSmRight /></span>
                </h2>
            <ScrollSnap>
                {Array.isArray(sortedTerraces) && sortedTerraces.length > 0 ? (
                    sortedTerraces.map((terrace: CustomTerraceType) => (
                        <BlobCard
                            key={terrace.cadastro_ref}
                            className="snap-start shrink-0 w-[60%] sm:w-[35%]"
                            picture={terrace.profile_pic ?? ""}
                            businessName={terrace.business_name}
                            rating={terrace.average_rating ?? 0}
                            blob={redBlob}
                            id={terrace.id}
                        />
                    ))
                ) : (
                    <div className="p-4 siyaDark-text text-start border-siya-principal border-r-4 border-b-4 rounded-2xl bg-gray-100 text-balance">
                        No s'han trobat terrasses sota aquests criteris, siusplau, prova amb altres filtres.
                    </div>
                )}
            </ScrollSnap>
        </div>
    )
}

export default TerraceSlider