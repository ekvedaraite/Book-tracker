// BooksPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksService from '../components/BooksService';
import { useDarkMode } from '../components/DarkModeContext';

const BooksPage = () => {
  const [authors, setAuthors] = useState([]); // State to store authors for filtering
  const [selectedAuthor, setSelectedAuthor] = useState(''); // State to store selected author
  const [sortCriteria, setSortCriteria] = useState(''); // State to store sorting criteria
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Fetch books including author information
    fetch('http://localhost:4000/books')
      .then(response => response.json())
      .then(data => {
        console.log('Books data:', data);

        // Extract unique authors from the received books data
        const uniqueAuthors = Array.from(new Set(data.map(book => book.author)));
        setAuthors(uniqueAuthors);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
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
      <div className='filterAndSortDiv'>
        <div className={`filteringSection ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <label className='filterByAuthor' htmlFor="authorFilter">Filter by Author:</label>
          <select id="authorFilter" value={selectedAuthor} onChange={handleAuthorChange}>
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
        <div className={`sortingSection ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <label className='sortBy' htmlFor="sortCriteria">Sort by:</label>
          <select id="sortCriteria" value={sortCriteria} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="highestRating">Rating (highest to lowest)</option>
            <option value="lowestRating">Rating (lowest to highest)</option>
            <option value="latestUpdated">Updated (latest)</option>
            <option value="newestReleaseDate">Release Date (newest)</option>
            <option value="oldestReleaseDate">Release Date (oldest)</option>
          </select>
        </div>
      </div>

      {/* BooksService component with author and sort filter */}
      <BooksService selectedAuthor={selectedAuthor} sortCriteria={sortCriteria} />
    </div>
  );
};

export default BooksPage;
