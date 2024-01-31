import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DarkModeProvider, useDarkMode } from './components/DarkModeContext'
import '../src/scss/styles.scss'
import BooksPage from './pages/BooksPage'
import AddBooksPage from './pages/AddBooksPage'
import BookLogsPage from './pages/BookLogsPage'
import AddLogPage from './pages/AddLogPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    //DarkModeProvider to provide dark mode context
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}

const AppContent = () => {
  // Use dark mode context to get current mode and set mode function
  const { isDarkMode, setDarkMode } = useDarkMode()

  return (
    // Set up the React Router for navigation
    <Router>
      {/* Dark mode toggle button */}
      <div className='toggleBtnDiv'>
        <label className={`toggle-button ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <input type="checkbox" checked={isDarkMode} onChange={() => setDarkMode(!isDarkMode)} />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/add-books" element={<AddBooksPage />} />
        <Route path="/" element={<BooksPage />} />
        <Route path="/book-logs/:id" element={<BookLogsPage />} />
        <Route path="/books/:id/add-log" element={<AddLogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
