import type { BlobCardProps } from "../../types/types";
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars";

const BlobCard = ({ className = "",
    picture,
    businessName,
    rating,
    blob,
    id,
}: BlobCardProps) => {

    return (
        <div className={`text-center ${className}`}>
            <Link
                to={`/terrassa/${id}`}>
                <div className="relative m-1 w-40 h-35 mx-auto">
                    {/* Blob passed as prop */}
                    <img
                        loading="lazy"
                        src={blob}
                        alt="Blob background"
                        className="absolute bottom-2 right-2 w-full h-full"
                    />
                    {/* Inner picture */}
                    <img
                        loading="lazy"
                        src={picture}
                        alt={businessName}
                        className="absolute top-[18%] left-[18%] w-[64%] h-[64%]
                        object-cover rounded-full"
                    />
                </div>
                {/* Star rating */}
                <RatingStars
                    rating={rating}
                />
                {/* Business name */}
                <p className={`text-sm mx-auto mt-2
                break-words truncate text-balance
                montserrat-siya siyaDark-text w-2/3
                bg-transparent`}>
                    {businessName}
                </p>
            </Link>
        </div>
    );
};

export default BlobCard;