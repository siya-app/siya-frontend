// components/ReviewForm.tsx
import { useState } from 'react';
import { createReview } from './createReview';

export function ReviewForm({ userId, terraceId, onSuccess }: {
  userId: string;
  terraceId: string;
  onSuccess?: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createReview({ rating, comment, id_user: userId, id_terrace: terraceId });
      onSuccess?.(); // p. ex. refrescar el slider
      setComment('');
      setRating(5);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-white">
      <label className="block mb-2">
        Nota (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 w-full"
          required
        />
      </label>
      <label className="block mb-2">
        Comentari:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full"
          rows={3}
          required
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? 'Enviant...' : 'Enviar Review'}
      </button>
    </form>
  );
}
