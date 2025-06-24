import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarsInputProps {
    terraceId: string;
    onChange: (rating: number) => void;
    initialRating?: number;
}

function RatingStarsInput({ onChange, initialRating = 0 }: RatingStarsInputProps) {
    const [rating, setRating] = useState(initialRating);
    const [clicked, setClicked] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setRating(index);
        onChange(index); // notify parent
    };

    return (
        <div className="flex gap-1 text-xl cursor-pointer">
            {Array(5)
                .fill(0)
                .map((_, i) => {
                    const starValue = i + 1;
                    const isActive = clicked !== null ? starValue <= clicked : starValue <= rating;

                    return isActive ? (
                        <FaStar
                            key={i}
                            className="text-yellow-400 mb-4"
                            onClick={() => handleClick(starValue)}
                            onMouseEnter={() => setClicked(starValue)}
                            onMouseLeave={() => setClicked(null)}
                        />
                    ) : (
                        <FaRegStar
                            key={i}
                            className="text-yellow-400 mb-4"
                            onClick={() => handleClick(starValue)}
                            onMouseEnter={() => setClicked(starValue)}
                            onMouseLeave={() => setClicked(null)}
                        />
                    );
                })}
        </div>
    );
}

export default RatingStarsInput;