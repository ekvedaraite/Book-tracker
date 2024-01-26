// BooksPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksService from '../components/BooksService';

const BooksPage = () => {
  const [allLogs, setAllLogs] = useState([]);

  useEffect(() => {
    // Fetch all logs
    fetch('http://localhost:4000/logs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Logs data:', data);
        setAllLogs(data);
      })
      .catch(error => console.error('Error fetching all logs:', error));
  }, []);

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
