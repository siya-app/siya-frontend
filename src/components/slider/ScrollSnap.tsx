import { useTerraceList } from "../../hooks/useTerraceList";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import BlobCard from "./BlobCard";

// function ScrollSnap() {

//     const { terraceList, setTerraceList} = TerraceListHook();

//     return (
//         <div>
//             <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 px-4">
//                 <div className="snap-start shrink-0 w-[60%] sm:w-[35%] bg-yellow-300 h-40 rounded-xl">Item 1</div>
//                 <div className="snap-start shrink-0 w-[60%] sm:w-[35%] bg-red-300 h-40 rounded-xl">Item 2</div>
//                 <div className="snap-start shrink-0 w-[60%] sm:w-[35%] bg-blue-300 h-40 rounded-xl">Item 3</div>
//                 <div className="snap-start shrink-0 w-[60%] sm:w-[35%] bg-green-300 h-40 rounded-xl">Item 4</div>
//             </div>
//         </div>
//     )
// }

// export default ScrollSnap

// async function ScrollSnap() {
//     const { terraceList, setTerraceList } = await TerraceListHook();

//     return (
//         <div>
//             <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 px-4">
//                 {terraceList.map((terrace: CustomTerraceType) => (
//                     <BlobCard 
//                         key={terrace.cadastro_ref} // Make sure to include a unique key
//                         className="snap-start shrink-0 w-[60%] sm:w-[35%]"
//                         picture={terrace.profile_pic} // assuming these are the props your BlobCard accepts
//                         businessName={terrace.business_name}
//                         rating={terrace.average_rating}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ScrollSnap;


function ScrollSnap() {
    const { terraceList } = useTerraceList();

    return (
        <div>
            <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 px-4">
                {terraceList.map((terrace: CustomTerraceType) => (
                    <BlobCard
                        key={terrace.cadastro_ref}
                        className="snap-start shrink-0 w-[60%] sm:w-[35%]"
                        picture={terrace.profile_pic ?? ""}
                        businessName={terrace.business_name}
                        rating={terrace.average_rating ?? 0}
                    />
                ))}
            </div>
        </div>
    );
}

export default ScrollSnap;