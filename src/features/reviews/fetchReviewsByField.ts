import type { Review } from "../../types/types";

export async function fetchReviewsByField(
  field: "terraceId" | "userId",
  value: string
): Promise<Review[]> {
  const res = await fetch("http://localhost:8080/reviews");

  if (!res.ok) {
    throw new Error("No s’han pogut carregar les reviews");
  }

  const allReviews: Review[] = await res.json();
  return allReviews.filter((review) => review[field] === value);
}
