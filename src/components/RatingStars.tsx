import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
    rating: number;
}

function RatingStars({ rating }: RatingStarsProps) {

    const stars = Array(5)
    .fill(0)
    .map((_, i) =>
        i < Math.round(rating) ?
        <FaStar key={i} className="text-yellow-400 text-xl" /> :
        <FaRegStar key={i} className="text-yellow-400 text-xl" />
    );

    return (
        <div className="flex justify-center gap-0.5 siyaDark-text">{stars}</div>
    )
}

export default RatingStars;