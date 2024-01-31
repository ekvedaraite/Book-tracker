import React, { useState, useEffect } from 'react'
import AddBookForm from '../components/AddBookForm'
import { useDarkMode } from '../components/DarkModeContext'
import Loading from '../components/Loading'

const AddBooksPage = () => {
  // Dark mode state
  const { isDarkMode } = useDarkMode()
  // Loading state, initially set to true
  const [loading, setLoading] = useState(true)
  // Simulate a delay (2 seconds) to mimic fetching data
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className={`addBooksPageDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header section with dynamic dark/light mode class */}
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Add a Book</h2>
      </div>
      {/* Display loading component while loading, or the AddBookForm when loading is false */}
      {loading ? (
        <Loading />
      ) : (
        <AddBookForm />
      )}
    </div>
  )
}

export default AddBooksPage
