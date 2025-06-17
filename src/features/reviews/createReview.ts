export async function createReview({
  rating,
  comment,
  id_user,
  id_terrace,
}: {
  rating: number;
  comment: string;
  id_user: string;
  id_terrace: string;
}) {
  const response = await fetch('http://localhost:8000/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating, comment, id_user, id_terrace }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Error creating review');
  }

  return await response.json();
}
