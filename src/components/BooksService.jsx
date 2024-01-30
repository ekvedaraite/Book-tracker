// BooksService.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BookCard from './BookCard';

const BooksService = ({ selectedAuthor, sortCriteria }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books and logs from the API
    Promise.all([
      fetch('http://localhost:4000/books').then((response) => response.json()),
      fetch('http://localhost:4000/logs').then((response) => response.json()),
    ])
      .then(([booksData, logsData]) => {
        console.log('Fetched books:', booksData);
        console.log('Fetched logs:', logsData);

        // Associate logs with corresponding books
        const booksWithLogs = booksData.map((book) => {
          const bookLogs = logsData.filter((log) => log.bookId === book.id);
          const averageRating = calculateAverageRating(bookLogs);
          return { ...book, rating: averageRating };
        });

        // Filter books based on the selected author
        let filteredBooks = selectedAuthor
          ? booksWithLogs.filter((book) => book.author === selectedAuthor)
          : booksWithLogs;

        // Sort books based on the selected sorting criteria
        switch (sortCriteria) {
          case 'highestRating':
            filteredBooks = filteredBooks.sort((a, b) => b.rating - a.rating);
            break;
          case 'lowestRating':
            filteredBooks = filteredBooks.sort((a, b) => a.rating - b.rating);
            break;
          case 'latestUpdated':
            filteredBooks = filteredBooks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            break;
          case 'newestReleaseDate':
            filteredBooks = filteredBooks.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            break;
          case 'oldestReleaseDate':
            filteredBooks = filteredBooks.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
            break;
          default:
            break;
        }

        setBooks(filteredBooks);
      })
      .catch((error) => console.error('Error fetching books and logs:', error));
  }, [selectedAuthor, sortCriteria]);

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

  // Helper function to calculate the average rating from logs
  const calculateAverageRating = (logs) => {
    const totalRating = logs.reduce((sum, log) => sum + log.rating, 0);
    const averageRating = logs.length > 0 ? totalRating / logs.length : 0;
    return averageRating;
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
