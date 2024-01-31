import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LogForm from '../components/LogForm'
import api from '../utils/api'
import { useDarkMode } from '../components/DarkModeContext'
import Loading from '../components/Loading'

const AddLogPage = () => {
  // Dark mode state
  const { isDarkMode } = useDarkMode()
  // Get book id from route params and initialize navigation
  const { id } = useParams()
  const navigate = useNavigate()
  // State for loading status, form data, and book details
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState('')
  const [finished, setFinished] = useState(false)
  const [date, setDate] = useState('')
  const [bookDetails, setBookDetails] = useState({})
  // Fetch book details when the component mounts
  useEffect(() => {
    api.getBookDetails(id)
      .then(data => {
        setBookDetails(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching book details:', error)
        setLoading(false)
      })
  }, [id])
  // Handle form submission
  const handleAddLog = (e) => {
    e.preventDefault()
    // Validate form data
    const currentDate = new Date().toISOString().split('T')[0]
    if (!date) {
      alert('Please enter a date')
      return
    }
    if (date > currentDate) {
      alert('Date cannot be in the future')
      return
    }
    if (!page) {
      alert('Please enter a page number')
      return
    }
    const parsedPage = parseInt(page)
    if (isNaN(parsedPage) || parsedPage < 0 || parsedPage > bookDetails.pages) {
      alert(`Invalid page number (should be between 0 and ${bookDetails.pages})`)
      return
    }
    if (!comment) {
      alert('Please enter a comment')
      return
    }
    if (finished && (isNaN(rating) || rating < 0 || rating > 5)) {
      alert('Invalid rating (should be between 0 and 5)')
      return
    }
    // Prepare log data for submission
    const logData = {
      bookId: id,
      date: date,
      page: parsedPage,
      comment,
      rating: finished ? parseInt(rating) : null,
    }
    // Set loading state and submit log data to the API
    setLoading(true)
    api.addLog(logData)
      .then(() => {
        // Navigate to the book logs page after successful submission
        navigate(`/book-logs/${id}`)
      })
      .catch((error) => {
        console.error('Error adding log:', error)
        setLoading(false)
      })
  }
  // If still loading, display a loading component
  if (loading) {
    return <Loading />
  }
  // Render the main content when data is loaded
  return (
    <div className={`addBookLogPage ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header section with dynamic dark/light mode class */}
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Add Log for {bookDetails.title}</h2>
      </div>
      {/* Log form component */}
      <LogForm
        date={date}
        setDate={setDate}
        page={page}
        comment={comment}
        rating={rating}
        setPage={setPage}
        setComment={setComment}
        setRating={setRating}
        finished={finished}
        setFinished={setFinished}
        handleAddLog={handleAddLog}
      />
    </div>
  )
}

export default AddLogPage
