import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import GenreSelect from './GenreSelect'
import TextInput from './TextInput'
import { useDarkMode } from '../components/DarkModeContext'

const AddBookForm = () => {
  // State to store book data
  const [bookData, setBookData] = useState({
    img: '',
    title: '',
    author: '',
    description: '',
    genre: [],
    pages: '',
    releaseDate: '',
  })
  // State to track genre input validation error
  const [genreError, setGenreError] = useState('')
  // Navigate function from react-router-dom to handle navigation
  const navigate = useNavigate()
  // Dark mode context to check if dark mode is enabled
  const { isDarkMode } = useDarkMode()
  // Function to handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookData((prevData) => ({ ...prevData, [name]: value }))
  }
  // Function to handle genre changes
  const handleGenreChange = (selectedGenres) => {
    setBookData((prevData) => ({ ...prevData, genre: selectedGenres }))
    if (selectedGenres.length === 0) {
      setGenreError('Please select at least one genre.')
    } else {
      setGenreError('')
    }
  }
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Form validation checks
    if (!bookData.img) {
      alert('Please fill in the Image URL field.')
      return
    }
    if (!bookData.title) {
      alert('Please fill in the Title field.')
      return
    }
    if (!bookData.author) {
      alert('Please fill in the Author field.')
      return
    }
    if (!bookData.description) {
      alert('Please fill in the Description field.')
      return
    }
    if (bookData.genre.length === 0) {
      alert('Please select at least one genre.')
      return
    }
    if (!bookData.pages) {
      alert('Please fill in the Pages field.')
      return
    }
    if (!bookData.releaseDate) {
      alert('Please select a Release Date.')
      return
    }
    const pages = parseInt(bookData.pages, 10)
    if (isNaN(pages) || pages <= 0) {
      alert('Please enter a valid number of pages (greater than 0).')
      return
    }
    const currentDate = new Date()
    const selectedDate = new Date(bookData.releaseDate)
    if (selectedDate > currentDate) {
      alert('Release date cannot be in the future.')
      return
    }
    // Post book data to the server
    fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...bookData, id: String(Date.now()) }),
    })
      .then((response) => response.json())
      .then(() => {
        // Navigate to the home page after successfully adding the book
        navigate('/')
      })
      .catch((error) => console.error('Error adding book:', error))
  }
  return (
    <motion.form
      className={`addBookForm ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      {/* Input for the book cover image URL */}
      <TextInput label="Image URL" name="img" value={bookData.img} onChange={handleInputChange} />
      {/* Input for the book title */}
      <TextInput label="Title" name="title" value={bookData.title} onChange={handleInputChange} />
      {/* Input for the book author */}
      <TextInput label="Author" name="author" value={bookData.author} onChange={handleInputChange} />
      {/* Input for the book description */}
      <TextInput label="Description" name="description" value={bookData.description} onChange={handleInputChange} />
      {/* Genre selection using the GenreSelect component */}
      <label>
        Genre (select multiple):
        <GenreSelect value={bookData.genre} onChange={handleGenreChange} />
        {genreError && <div className="error-message">{genreError}</div>}
      </label>
      {/* Input for the number of pages in the book */}
      <TextInput label="Pages" name="pages" value={bookData.pages} onChange={handleInputChange} />
      {/* Input for the book release date */}
      <TextInput label="Release Date" name="releaseDate" type="date" value={bookData.releaseDate} onChange={handleInputChange} />
      {/* Button to submit the form */}
      <button className={`bookFormBtn ${isDarkMode ? 'dark-mode' : 'light-mode'}`} type="submit">Add Book</button>
    </motion.form>
  )
}

export default AddBookForm
