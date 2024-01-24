import React from 'react';

const RatingStars = ({ rating }) => {
  const totalStars = 5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star-yellow' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return <div className="rating-container">{renderStars()}</div>;
};

export default RatingStars;
