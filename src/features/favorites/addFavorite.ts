export async function addFavorite ({ 
    userId, 
    terraceId
} : {
    userId: string;
    terraceId: string;
}
) {
const response = await fetch('/api/favorites', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ userId,terraceId }),
});
if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Error afegint favorit');
  } 

  return await response.json();
}

