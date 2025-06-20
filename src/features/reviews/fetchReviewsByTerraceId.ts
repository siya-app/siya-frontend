import type { Review } from "../../types/types";

export async function fetchReviewsByTerraceId(terraceId: string): Promise<Review[]> {
  const res = await fetch("http://localhost:8080/reviews");

  if (!res.ok) {
    throw new Error("No s’han pogut carregar les reviews");
  }

  const allReviews: Review[] = await res.json();
  console.log("Reviews carregades:", allReviews);
  // Filtrar només les de la terrassa concreta
  return allReviews.filter((review) => review.terraceId === terraceId);
}