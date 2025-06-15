import type { BlobCardProps } from "../../types/types";

const BlobCard =
({ className = "",
    picture,
    businessName,
    rating } :
    BlobCardProps) => {
    return (
        <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
            <img
                src={picture}
                alt={businessName}
                className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{businessName}</h3>
            <p className="text-sm text-gray-500">⭐ {rating.toFixed(1)}</p>
        </div>
    );
};

export default BlobCard;