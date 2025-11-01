import React, { useState } from 'react';

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarIcon: React.FC<{
  filled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}> = ({ filled, onMouseEnter, onMouseLeave, onClick }) => (
    <svg 
      className={`w-8 h-8 cursor-pointer transition-colors ${filled ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} 
      fill="currentColor" 
      viewBox="0 0 20 20"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
);

const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                    <StarIcon 
                        key={i} 
                        filled={starValue <= (hoverRating || rating)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starValue)}
                    />
                );
            })}
        </div>
    );
};

export default StarRatingInput;