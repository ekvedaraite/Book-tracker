import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../components/DarkModeContext'; // Import the context hook

const BookDetails = ({ bookDetails }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode(); // Use the context hook

  const handleAddLogClick = () => {
    // Navigate to the Add Log page for the current book
    navigate(`/books/${bookDetails.id}/add-log`);
  };

  return (
    <div className={`bookDetailsDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='imageContainer'>
        <img className='bookLogImg' src={bookDetails.img} alt={bookDetails.title} />
      </div>
      <div className='bookInfo'>
        <h2>{bookDetails.title}</h2>
        <p><strong>Author:</strong> {bookDetails.author}</p>
        <p><strong>Genre:</strong> {bookDetails.genre?.join(', ') || 'N/A'}</p>
        <p><strong>Description:</strong> {bookDetails.description}</p>
        <p><strong>Pages:</strong> {bookDetails.pages || 'N/A'}</p>
        <p><strong>Publication Date:</strong> {bookDetails.releaseDate || 'N/A'}</p>
        <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={handleAddLogClick}>
          Add Log
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
