import { createContext, useState, type ReactNode } from "react";
import axios from 'axios';

interface Review {
    rating: number | null;
    comment: string | null;
    userId: string;
    terraceId: string;
    [key: string]: unknown;
}
interface ReviewContextType {
    allReviews: Review[];
    reviewError: string | unknown;
    getReviews: () => Promise<void>;
}

interface ReviewProviderProps {
    children: ReactNode;
}
const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

function ReviewProvider({ children }: ReviewProviderProps) {

    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [reviewError, setReviewError] = useState<string | unknown>("");

    const getReviews = async () => {
        const reviewURL = import.meta.env.VITE_API_ALL_REVIEWS
        try {
            const response = await axios.get<Review[]>(reviewURL);
            setAllReviews(response.data);

        } catch (error: unknown) {
            setReviewError(error)
        }
    }

    return (
        <ReviewContext.Provider value={{ allReviews, reviewError, getReviews }}>
            {children}
        </ReviewContext.Provider>
    )
}

export { ReviewProvider, ReviewContext }