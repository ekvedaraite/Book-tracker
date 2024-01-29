// BooksPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksService from '../components/BooksService';
import { useDarkMode } from '../components/DarkModeContext';

const BooksPage = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [authors, setAuthors] = useState([]); // State to store authors for filtering
  const [selectedAuthor, setSelectedAuthor] = useState(''); // State to store selected author
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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

    // Fetch all authors
    fetch('http://localhost:4000/books/authors')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Authors data:', data);
        setAuthors(data);
      })
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  return (
    <div className={`booksPageDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Book Library</h2>
        <Link to='/add-books'>
          <button className={`addBookBtn ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={toggleDarkMode}>
            Add a Book
          </button>
        </Link>
      </div>

      {/* Filtering section */}
      <div className={`filteringSection ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <label htmlFor="authorFilter">Filter by Author:</label>
        <select id="authorFilter" value={selectedAuthor} onChange={handleAuthorChange}>
          <option value="">All Authors</option>
          {authors.map(author => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      <BooksService selectedAuthor={selectedAuthor} />
    </div>
  );
};

export default BooksPage;
