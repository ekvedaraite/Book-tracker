import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import RatingStars from './RatingStars'
import { useDarkMode } from '../components/DarkModeContext'

const BookCard = ({ book, onDeleteClick }) => {
  // State to store all logs related to the book
  const [allLogs, setAllLogs] = useState([])
  // Dark mode context to check if dark mode is enabled
  const { isDarkMode } = useDarkMode()
  // Fetch logs for the specific book when the component mounts or the book ID changes
  useEffect(() => {
    fetch(`http://localhost:4000/logs?bookId=${book.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => setAllLogs(data))
      .catch(error => console.error('Error fetching logs for the book:', error))
  }, [book.id])
  // Function to handle errors when loading the book cover image
  const handleImageError = event => {
    console.error('Error loading image:', event.target.src)
  }
  // Function to handle the click event for deleting the book
  const handleDeleteClick = () => {
    onDeleteClick && onDeleteClick(book.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`bookCardDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
    >
      {/* Link to navigate to the book logs page */}
      <Link to={`/book-logs/${book.id}`}>
        {/* Display book cover image with max width of 100px */}
        <img
          src={book.img}
          alt={book.title}
          style={{ maxWidth: '100px' }}
          onError={handleImageError}
        />
      </Link>
      {/* Display book title */}
      <h3>{book.title}</h3>

      {/* Display star ratings based on logs for the book */}
      <RatingStars logs={allLogs} bookId={book.id} />

      {/* Display book author */}
      <p>{book.author}</p>
      {/* Button to trigger the function for deleting the book */}
      <button className={`deleteBtn ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={handleDeleteClick}>
        Delete
      </button>
    </motion.div>
  )
}

export default BookCard
