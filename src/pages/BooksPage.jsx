// BooksPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksService from '../components/BooksService';
import { useDarkMode } from '../components/DarkModeContext';
import Loading from '../components/Loading'; // Import the Loading component

const BooksPage = () => {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:4000/books')
      .then(response => response.json())
      .then(data => {
        const uniqueAuthors = Array.from(new Set(data.map(book => book.author)));
        setAuthors(uniqueAuthors);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

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
      <div className={`filterAndSortDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="filteringSection">
          <label className={`filterByAuthor ${isDarkMode ? 'dark-mode' : 'light-mode'}`} htmlFor="authorFilter">Filter by Author:</label>
          <select id="authorFilter" value={selectedAuthor} onChange={handleAuthorChange} className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
        <div className="sortingSection">
          <label className={`sortBy ${isDarkMode ? 'dark-mode' : 'light-mode'}`} htmlFor="sortCriteria">Sort by:</label>
          <select id="sortCriteria" value={sortCriteria} onChange={handleSortChange} className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
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
