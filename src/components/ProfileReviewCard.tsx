
import React from 'react';
import {Link} from "react-router-dom"

interface ReviewCardProps {
  restaurantName: string;
  rating: number;
  comment: string;
  terraceId: string
}

const ProfileReviewCard: React.FC<ReviewCardProps> = ({ restaurantName, rating, comment, terraceId }) => {

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-80 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2"><Link to={`/terrassa/${terraceId}`} className="hover:underline text-blue-600">
          {restaurantName}
        </Link></h3>
      <div className="mb-2 text-xl">{renderStars(rating)}</div>
      <p className="text-gray-700 text-sm">{comment}</p>
    </div>
  );
};

export default ProfileReviewCard;
