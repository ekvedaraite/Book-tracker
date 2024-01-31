import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BookDetails from '../components/BookDetails'
import LogCard from '../components/LogCard'
import api from '../utils/api'
import { useDarkMode } from '../components/DarkModeContext'
import Loading from '../components/Loading'
// Component for the header with title and back button
const PageHeader = ({ title, onClick }) => {
  const { isDarkMode } = useDarkMode()
  return (
    <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>{title}</h2>
      <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={onClick}>
        Go Back
      </button>
    </div>
  )
}
// Component to display log cards with animation
const LogCards = ({ logs, onDeleteClick, onSaveEdit }) => (
  <div className="log-cards">
    <AnimatePresence>
      {logs.map((log) => (
        <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LogCard log={log} onDeleteClick={onDeleteClick} onSaveEdit={onSaveEdit} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
)

const BookLogsPage = () => {
  // Get book id from route params
  const { id } = useParams()
  const navigate = useNavigate()
  // State for loading status, book details, and book logs
  const [loading, setLoading] = useState(true)
  const [bookDetails, setBookDetails] = useState({})
  const [bookLogs, setBookLogs] = useState([])
  // Dark mode state
  const { isDarkMode } = useDarkMode()
  // Fetch book details and logs when the component mounts
  useEffect(() => {
    setLoading(true)
    Promise.all([api.getBookDetails(id), api.getBookLogs(id)])
      .then(([bookDetailsData, bookLogsData]) => {
        setBookDetails(bookDetailsData)
        setBookLogs(bookLogsData)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [id])
  // Delete log handler
  const handleDeleteLog = (logId) => {
    api.deleteLog(logId)
      .then(() => setBookLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId)))
      .catch((error) => console.error('Error deleting log:', error))
  }
  // Save log handler
  const handleSaveLog = (updatedLog) => {
    api.updateLog(updatedLog.id, updatedLog)
      .then(() => setBookLogs((prevLogs) => prevLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log))))
      .catch((error) => console.error('Error updating log:', error))
  }
  // Add log handler to navigate to the add-log page
  const handleAddLog = () => navigate(`/books/${id}/add-log`)
  // If still loading, display a loading component
  if (loading) {
    return <Loading />
  }

  return (
    <div className={`bookLogsPageDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header section with dynamic dark/light mode class */}
      <PageHeader title={`Book Logs for ${bookDetails.title}`} onClick={() => navigate('/')} />
      {/* Book details component with add log button */}
      <BookDetails bookDetails={bookDetails} onAddLogClick={handleAddLog} />
      {/* Log cards component with delete and save handlers */}
      <LogCards logs={bookLogs} onDeleteClick={handleDeleteLog} onSaveEdit={handleSaveLog} />
    </div>
  )
}

export default BookLogsPage
