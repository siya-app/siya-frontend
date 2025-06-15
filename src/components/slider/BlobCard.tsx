import type { BlobCardProps } from "../../types/types";
import { FaStar, FaRegStar } from "react-icons/fa";

// const BlobCard =
// ({ className = "",
//     picture,
//     businessName,
//     rating } :
//     BlobCardProps) => {
//     return (
//         <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
//             <img
//                 src={picture}
//                 alt={businessName}
//                 className="w-full h-32 object-cover rounded-md mb-2"
//             />
//             <h3 className="text-lg font-semibold">{businessName}</h3>
//             <p className="text-sm text-gray-500">⭐ {rating.toFixed(1)}</p>
//         </div>
//     );
// };

// export default BlobCard;

const BlobCard = ({ className = "", picture, businessName, rating, blob }: BlobCardProps) => {
    const stars = Array(5)
        .fill(0)
        .map((_, i) =>
            i < Math.round(rating) ? <FaStar key={i} className="text-black" /> : <FaRegStar key={i} className="text-black" />
        );

    return (
        
        <div className={`text-center ${className}`}>
            <div className="relative m-1 w-40 h-35 mx-auto">
                {/* Blob passed as prop */}
                <img
                loading="lazy"
                    src={blob}
                    alt="Blob background"
                    className="absolute bottom-2 right-2 w-full h-full z-0"
                />

                {/* Inner picture */}
                <img
                    loading="lazy"
                    src={picture}
                    alt={businessName}
                    className="absolute top-[18%] left-[18%] w-[64%] h-[64%] object-cover rounded-full z-10"
                />
            </div>

            {/* Business name */}
            <h3 className="text-sm w-auto font-semibold mt-1 break-words truncate text-balance">{businessName}</h3>

            {/* Star rating */}
            <div className="flex justify-center mt-1 gap-0.5 text-xs">
                {stars}
            </div>
        </div>
    );
};

export default BlobCard;