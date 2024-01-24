import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const BookCard = ({ book, onDeleteClick }) => {
  const [bookRating, setBookRating] = useState(null);

  useEffect(() => {
    // Fetch the book logs to get the rating
    fetch(`http://localhost:4000/logs?bookId=${book.id}`)
      .then(response => response.json())
      .then(data => {
        // Extract the rating from logs
        const rating = data.length > 0 ? data[0].rating : null;
        setBookRating(rating);
      })
      .catch(error => console.error('Error fetching book logs:', error));
  }, [book.id]);

  const handleImageError = (event) => {
    console.error('Error loading image:', event.target.src);
  };

  const handleDeleteClick = () => {
    // Trigger the onDeleteClick prop with the book ID
    onDeleteClick && onDeleteClick(book.id);
  };

  return (
    <div className='bookCardDiv'>
      {/* Add a Link to navigate to BookLogsPage with the book ID */}
      <Link to={`/book-logs/${book.id}`}>
        <img
          src={book.img}
          alt={book.title}
          style={{ maxWidth: '100px' }}
          onError={handleImageError}
        />
      </Link>
      <h3>{book.title}</h3>
      {bookRating !== null && <RatingStars rating={bookRating} />}
      <p>{book.author}</p>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default BookCard;
