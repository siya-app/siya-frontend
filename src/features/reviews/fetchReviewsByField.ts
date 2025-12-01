import type { Review } from "../../types/types";

// export async function fetchReviewsByField(
//   field: "terraceId",
//   value: string
// ): Promise<Review[]> {
//   const API_REVIEWS = import.meta.env.VITE_API_ALL_REVIEWS;
//   const res = await fetch(API_REVIEWS);

//   if (!res.ok) {
//     throw new Error("No s’han pogut carregar les reviews");
//   }

//   const allReviews: Review[] = await res.json();
//   return allReviews.filter((review) => review[field] === value);
// }

export async function fetchReviewsByField(
  field: "terraceId" | "userId",
  value: string
): Promise<Review[]> {
  const API_REVIEWS = import.meta.env.VITE_API_ALL_REVIEWS;
  const res = await fetch(API_REVIEWS);

  if (!res.ok) {
    throw new Error("No s’han pogut carregar les reviews");
  }

  const allReviews: Review[] = await res.json();
  return allReviews.filter((review) => review[field] === value);
}
