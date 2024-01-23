import React, { useState, useEffect } from 'react';
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

  return (
    <div className="bookCardsContainer">
      {books.map((book) => (
        <div key={book.id} className="singleBookCard"> {/* Individual div for each book card */}
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BooksService;
