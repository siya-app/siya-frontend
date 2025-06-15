import { useTerraceList } from "../../hooks/useTerraceList";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import BlobCard from "./BlobCard";
import redBlob from '../../assets/blobs/red-blob.png';
import { useRef } from "react";

function ScrollSnap() {
    const { terraceList } = useTerraceList();
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        console.log("scroll", direction);
        const container = containerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.7; // scroll 70% of the view
            container.scrollBy({ 
                left: direction === "left" ? -scrollAmount : scrollAmount, 
                behavior: "smooth" 
            });
        }
    };

    return (
        <div className="relative bg-transparent">
            {/* Arrows only on desktop (hidden on mobile/tablet) */}
            <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
                bg-white/10 backdrop-blur-sm p-2
                rounded-full z-50 ms-3"
                aria-label="Scroll Left"
            >   
                ◀
            </button>

            <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2
                -translate-y-1/2 bg-white/10 backdrop-blur-sm
                p-2 rounded-full z-50 me-3"
                aria-label="Scroll Right"
            >
                ▶
            </button>

            <div
                ref={containerRef}
                className="overflow-x-auto
                scrollbar-hide
                snap-x snap-mandatory
                flex
                px-15
                md:px-20
                lg:px-60"
            >
                {terraceList.map((terrace: CustomTerraceType) => (
                    <BlobCard
                        key={terrace.cadastro_ref}
                        className="snap-start shrink-0 w-[60%] sm:w-[35%]"
                        picture={terrace.profile_pic ?? ""}
                        businessName={terrace.business_name}
                        rating={terrace.average_rating ?? 0}
                        blob={redBlob}
                    />
                ))}
            </div>
        </div>
    );
}

export default ScrollSnap;