import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../components/DarkModeContext'

const BookDetails = ({ bookDetails }) => {
  // React Router's `useNavigate` hook to enable navigation
  const navigate = useNavigate()
  // Dark mode context to check if dark mode is enabled
  const { isDarkMode } = useDarkMode()
  // Function to handle the click event for adding a log
  const handleAddLogClick = () => {
    // Navigate to the "add-log" page for the specific book
    navigate(`/books/${bookDetails.id}/add-log`)
  }
  return (
    <div className={`bookDetailsDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='imageContainer'>
        {/* Display book cover image */}
        <img className='bookLogImg' src={bookDetails.img} alt={bookDetails.title} />
      </div>
      <div className='bookInfo'>
        <h2>{bookDetails.title}</h2>
        <p><strong>Author:</strong> {bookDetails.author}</p>
        <p><strong>Genre:</strong> {bookDetails.genre?.join(', ') || 'N/A'}</p>
        <p><strong>Description:</strong> {bookDetails.description}</p>
        <p><strong>Pages:</strong> {bookDetails.pages || 'N/A'}</p>
        <p><strong>Publication Date:</strong> {bookDetails.releaseDate || 'N/A'}</p>
        {/* Button to trigger the function for adding a log */}
        <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={handleAddLogClick}>
          Add Log
        </button>
      </div>
    </div>
  )
}

export default BookDetails
