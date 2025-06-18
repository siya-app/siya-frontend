import type { BlobCardProps } from "../../types/types";
import { FaStar, FaRegStar } from "react-icons/fa";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";

const BlobCard = ({ className = "", picture, businessName, rating, blob, id }: BlobCardProps) => {
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
            <Link
            to={`/terrace/${id}`}
            className={`text-sm w-auto mt-1
            break-words truncate text-balance
            montserrat-siya siyaDark-text
            bg-transparent`}
            >{businessName}</Link>

            {/* Star rating */}
            <div className="flex justify-center mt-1 gap-0.5 text-xs siyaDark-text">
                {stars}
            </div>
        </div>
    );
};

export default BlobCard;