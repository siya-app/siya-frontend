import type { Review } from "../../types/types";

export async function fetchReviewByUserId(userId: string): Promise<Review[]> {
    const res = await fetch("http://localhost:8080/reviews");

    if (!res.ok) {
        throw new Error("No s’han pogut carregar les reviews");
    }
    const allReviews: Review[] = await res.json();
    return allReviews.filter((review) => review.userId === userId);
}