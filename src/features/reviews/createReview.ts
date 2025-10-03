export async function createReview({
  rating,
  comment,
  userId,
  userName,
  terraceId,
}: {
  rating: number;
  comment: string;
  userId: string;
  userName?: string;
  terraceId: string;
}) {
  const API_REVIEWS = import.meta.env.VITE_API_ALL_REVIEWS;
  const response = await fetch(API_REVIEWS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating, comment, userId, terraceId, userName }), // Afegit userName
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Error creating review");
  }

  return await response.json();
}
