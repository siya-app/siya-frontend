export async function fetchReviewsByTerraceId(terraceId: string) {
  const res = await fetch(`http://localhost:8080/reviews/terrace/${terraceId}`);

  if (!res.ok) {
    throw new Error('No s’han pogut carregar les reviews');
  }

  return await res.json(); // suposadament retorna un array de reviews
}
