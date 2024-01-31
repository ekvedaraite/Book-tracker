import React, { createContext, useContext, useState, useEffect } from 'react'
// Create a context for dark mode
const DarkModeContext = createContext()
// DarkModeProvider component to manage dark mode state
export const DarkModeProvider = ({ children }) => {
  // State to track dark mode preference, retrieving stored value or defaulting to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode')
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false
  })
  // Function to set dark mode preference and store in local storage
  const setDarkMode = (value) => {
    setIsDarkMode(value)
    localStorage.setItem('darkMode', JSON.stringify(value))
  }
  // Apply dark mode class to the body when dark mode changes
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode)
  }, [isDarkMode])
  // Provide dark mode state and setter to the context
  return (
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
// Custom hook to conveniently use dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}
