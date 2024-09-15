import React from 'react';
import { Star } from 'lucide-react';

interface StarProps {
  rating?: number;
}

const RatingStar: React.FC<StarProps> = ({ rating }) => {
  const fullStars = Math.floor(rating ?? 0);
  const hasHalfStar = (rating ?? 0) % 1 !== 0;

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} className="fill-[#e9be0f] text-[#e9be0f]" />;
        } else if (index === fullStars && hasHalfStar) {
          return (
            <div key={index} className="relative">
              <Star className="text-gray-300" />
              <div className="absolute inset-0 w-1/2 overflow-hidden">
                <Star className="fill-[#e9be0f] text-[#e9be0f]" />
              </div>
            </div>
          );
        } else {
          return <Star key={index} className="text-gray-300" />;
        }
      })}
    </div>
  );
};

export default RatingStar;
