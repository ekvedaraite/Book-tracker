// Rating.jsx
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, max }) => {
  const stars = [];
  const roundedValue = Math.round(value * 2) / 2; // Round to the nearest 0.5

  for (let i = 0; i < max; i++) {
    if (i < roundedValue) {
      // Full star
      stars.push(<FaStar key={i} className="star filled" />);
    } else if (i === Math.floor(roundedValue) && roundedValue % 1 !== 0) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} className="star half" />);
    } else {
      // Empty star
      stars.push(<FaRegStar key={i} className="star" />);
    }
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
