// BooksService.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BookCard from './BookCard';

const BooksService = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the API
    fetch('http://localhost:4000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleDeleteBook = (bookId) => {
    // Perform book deletion logic using API function
    fetch(`http://localhost:4000/books/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Remove the deleted book from the state
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      })
      .catch((error) => console.error('Error deleting book:', error));
  };

  return (
    <div className="bookCardsContainer">
      <AnimatePresence>
        {books.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="singleBookCard">
              <BookCard book={book} onDeleteClick={handleDeleteBook} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BooksService;
