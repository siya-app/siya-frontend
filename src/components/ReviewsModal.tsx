import React from 'react';
import ProfileReviewCard from './ProfileReviewCard';
import type { CustomTerraceType } from '../types/zod/customTerrace-schema';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  allTerraces: CustomTerraceType[];
}
interface Review {
  id: number;
  restaurantName: string;
  rating: number;
  comment: string;
  terraceId: string;
  userId: string;
}
const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose, reviews, allTerraces }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Totes les ressenyes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {reviews.map((review) => {
            const currentTerrace = allTerraces.find(
              (terrace) => terrace.id === review.terraceId
            );
            if (!currentTerrace) return null;
            return (
              <ProfileReviewCard
                key={review.id}
                restaurantName={currentTerrace.business_name}
                rating={review.rating}
                comment={review.comment}
                terraceId={currentTerrace.id || ''}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
