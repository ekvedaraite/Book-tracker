// RatingStars.jsx
import React, { useState, useEffect } from 'react';

const RatingStars = ({ logs, bookId }) => {
  console.log('Logs in RatingStars:', logs);
  console.log('bookId in RatingStars:', bookId);

  const [rating, setRating] = useState(null);

  useEffect(() => {
    if (!bookId) {
      console.error('BookId prop is missing in RatingStars component.');
      return;
    }

    const bookLog = logs.find((log) => log.bookId === bookId);
    setRating(bookLog ? bookLog.rating : null);
  }, [logs, bookId]);

  const totalStars = 5;

  const renderStars = () => {
    if (rating !== null) {
      const stars = [];
      for (let i = 1; i <= totalStars; i++) {
        stars.push(
          <span key={i} className={i <= rating ? 'star-yellow' : 'star'}>
            ★
          </span>
        );
      }
      return stars;
    } else {
      return null;
    }
  };

  return <div className="rating-container">{renderStars()}</div>;
};

export default RatingStars;
