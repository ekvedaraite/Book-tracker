// BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const handleImageError = (event) => {
    console.error('Error loading image:', event.target.src);
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
      <p>{book.author}</p>
    </div>
  );
};

export default BookCard;
