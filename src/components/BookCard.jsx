// BookCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars';

const BookCard = ({ book, onDeleteClick }) => {
  const [allLogs, setAllLogs] = useState([]);

  useEffect(() => {
    // Fetch logs for the specific book
    fetch(`http://localhost:4000/logs?bookId=${book.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAllLogs(data))
      .catch(error => console.error('Error fetching logs for the book:', error));
  }, [book.id]);
  

  const handleImageError = event => {
    console.error('Error loading image:', event.target.src);
  };

  const handleDeleteClick = () => {
    onDeleteClick && onDeleteClick(book.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='bookCardDiv'
    >
      <Link to={`/book-logs/${book.id}`}>
        <img
          src={book.img}
          alt={book.title}
          style={{ maxWidth: '100px' }}
          onError={handleImageError}
        />
      </Link>
      <h3>{book.title}</h3>

      <RatingStars logs={allLogs} bookId={book.id} />

      <p>{book.author}</p>
      <button onClick={handleDeleteClick}>Delete</button>
    </motion.div>
  );
};

export default BookCard;
