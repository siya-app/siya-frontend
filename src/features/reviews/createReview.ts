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
  const response = await fetch('http://localhost:8080/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating, comment, userId, terraceId, userName }), // Afegit userName
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Error creating review');
  } 

  return await response.json();
}
