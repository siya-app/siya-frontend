import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
    rating: number;
}

function RatingStars({ rating }: RatingStarsProps) {

    const stars = Array(5)
    .fill(0)
    .map((_, i) =>
        i < Math.round(rating) ?
        <FaStar key={i} className="text-black" /> :
        <FaRegStar key={i} className="text-black" />
    );

    return (
        <div className="flex justify-center mt-1 gap-0.5 text-xs siyaDark-text">{stars}</div>
    )
}

export default RatingStars;