import React, { useEffect, useReducer } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BookCard from './BookCard'
// Initial state for the reducer
const initialState = {
  books: [],
}
// Reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case 'setBooks':
      return { ...state, books: action.payload }
    default:
      return state
  }
}
const BooksService = ({ selectedAuthor, sortCriteria }) => {
  // State management using useReducer
  const [state, dispatch] = useReducer(reducer, initialState)
  // Effect to fetch and update books based on selectedAuthor and sortCriteria
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/books').then((response) => response.json()),
      fetch('http://localhost:4000/logs').then((response) => response.json()),
    ])
      .then(([booksData, logsData]) => {
        // Process books and logs data
        const booksWithLogs = booksData.map((book) => {
          const bookLogs = logsData.filter((log) => log.bookId === book.id)
          const latestLog = getLatestLog(bookLogs)
          const latestRating = latestLog ? latestLog.rating : 0
          return { ...book, rating: latestRating }
        })
        // Apply author filter if selectedAuthor is provided
        let filteredBooks = selectedAuthor
          ? booksWithLogs.filter((book) => book.author === selectedAuthor)
          : booksWithLogs
        // Apply sorting based on sortCriteria
        switch (sortCriteria) {
          case 'highestRating':
            filteredBooks = filteredBooks.sort((a, b) => b.rating - a.rating)
            break
          case 'lowestRating':
            filteredBooks = filteredBooks.sort((a, b) => a.rating - b.rating)
            break
          case 'latestUpdated':
            filteredBooks = filteredBooks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            break
          case 'newestReleaseDate':
            filteredBooks = filteredBooks.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
            break
          case 'oldestReleaseDate':
            filteredBooks = filteredBooks.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
            break
          default:
            break
        }
        // Update state with filtered and sorted books
        dispatch({ type: 'setBooks', payload: filteredBooks })
      })
      .catch((error) => console.error('Error fetching books and logs:', error))
  }, [selectedAuthor, sortCriteria])
  // Handler for deleting a book
  const handleDeleteBook = (bookId) => {
    fetch(`http://localhost:4000/books/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        // Update state by removing the deleted book
        const updatedBooks = state.books.filter((book) => book.id !== bookId)
        dispatch({ type: 'setBooks', payload: updatedBooks })
      })
      .catch((error) => console.error('Error deleting book:', error))
  }
  // Function to get the latest log for a book
  const getLatestLog = (logs) => {
    if (logs.length === 0) {
      return null
    }
    return logs.reduce((latest, log) => (new Date(log.updatedAt) > new Date(latest.updatedAt) ? log : latest), logs[0])
  }
  return (
    <div className="bookCardsContainer">
      {/* AnimatePresence for smooth animations */}
      <AnimatePresence>
        {state.books.map((book) => (
          // Animate book cards individually
          <motion.div
            key={book.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="singleBookCard">
              {/* Render BookCard component for each book */}
              <BookCard book={book} onDeleteClick={handleDeleteBook} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default BooksService
