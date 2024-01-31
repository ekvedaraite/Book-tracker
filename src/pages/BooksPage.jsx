import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BooksService from '../components/BooksService'
import { useDarkMode } from '../components/DarkModeContext'
import Loading from '../components/Loading'
import FilterSortSection from '../components/FilterSortSection'

const BooksPage = () => {
  // State for loading status, authors list, selected author, and sort criteria
  const [loading, setLoading] = useState(true)
  const [authors, setAuthors] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [sortCriteria, setSortCriteria] = useState('')
  // Dark mode state and toggle function from the context
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  // Fetch books data when the component mounts
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:4000/books')
      .then(response => response.json())
      .then(data => {
        // Extract unique authors from the data
        const uniqueAuthors = Array.from(new Set(data.map(book => book.author)))
        setAuthors(uniqueAuthors)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching books:', error)
        setLoading(false)
      })
  }, [])
  // Handler for selecting an author
  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value)
  }
  // Handler for changing the sort criteria
  const handleSortChange = (e) => {
    setSortCriteria(e.target.value)
  }
  // If still loading, display a loading component
  if (loading) {
    return <Loading />
  }
  // Render the main content when data is loaded
  return (
    <div className={`booksPageDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header section with dynamic dark/light mode class */}
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Book Library</h2>
        {/* Link to add a book with a button, toggling dark mode on click */}
        <Link to='/add-books'>
          <button className={`addBookBtn ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={toggleDarkMode}>
            Add a Book
          </button>
        </Link>
      </div>
      {/* Filter and sort section component */}
      <FilterSortSection
        isDarkMode={isDarkMode}
        authors={authors}
        selectedAuthor={selectedAuthor}
        sortCriteria={sortCriteria}
        handleAuthorChange={handleAuthorChange}
        handleSortChange={handleSortChange}
      />
      {/* Books service component with selected author and sort criteria */}
      <BooksService selectedAuthor={selectedAuthor} sortCriteria={sortCriteria} />
    </div>
  )
}

export default BooksPage
