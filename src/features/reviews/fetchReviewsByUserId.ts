import type { Review } from "../../types/types";

export async function fetchReviewsByUserId(userId: string): Promise<Review[]> {
    const res = await fetch("http://localhost:8080/reviews");

    if (!res.ok) {
        throw new Error("Could not fetch reviews");
    }

    const allReviews: Review[] = await res.json();
    return allReviews.filter((review) => review.userId === userId);
}