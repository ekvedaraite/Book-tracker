// BooksPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BooksService from '../components/BooksService';

const BooksPage = () => {
  return (
    <div className='booksPageDiv'>
      <div className='header'>
        <h2>Book Library</h2>
        <Link to='/add-books'>
          <button className='addBookBtn'>Add a Book</button>
        </Link>
      </div>
      <BooksService />
    </div>
  );
};

export default BooksPage;
