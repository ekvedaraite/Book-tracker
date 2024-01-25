import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenreSelect from './GenreSelect';
import TextInput from './TextInput';

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    img: '',
    title: '',
    author: '',
    description: '',
    genre: [],
    pages: '',
    releaseDate: '',
  });

  const [genreError, setGenreError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenreChange = (selectedGenres) => {
    setBookData((prevData) => ({ ...prevData, genre: selectedGenres }));

    // Check if at least one genre is selected
    if (selectedGenres.length === 0) {
      setGenreError('Please select at least one genre.');
    } else {
      setGenreError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!bookData.img) {
      alert('Please fill in the Image URL field.');
      return;
    }

    if (!bookData.title) {
      alert('Please fill in the Title field.');
      return;
    }

    if (!bookData.author) {
      alert('Please fill in the Author field.');
      return;
    }

    if (!bookData.description) {
      alert('Please fill in the Description field.');
      return;
    }

    if (bookData.genre.length === 0) {
      alert('Please select at least one genre.');
      return;
    }

    if (!bookData.pages) {
      alert('Please fill in the Pages field.');
      return;
    }

    if (!bookData.releaseDate) {
      alert('Please select a Release Date.');
      return;
    }

    // Validate pages is a number greater than 0
    const pages = parseInt(bookData.pages, 10);
    if (isNaN(pages) || pages <= 0) {
      alert('Please enter a valid number of pages (greater than 0).');
      return;
    }

    // Validate releaseDate
    const currentDate = new Date();
    const selectedDate = new Date(bookData.releaseDate);

    if (selectedDate > currentDate) {
      alert('Release date cannot be in the future.');
      return;
    }

    // TODO: Perform POST request to add a new book
    // Use fetch or your preferred HTTP library for making API requests
    fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...bookData, id: Date.now() }), // Using Date.now() for simplicity, replace with your preferred ID generation logic
    })
      .then((response) => response.json())
      .then(() => {
        // Navigate back to the BooksPage after a successful book addition
        navigate('/');
      })
      .catch((error) => console.error('Error adding book:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Image URL" name="img" value={bookData.img} onChange={handleInputChange} />
      <TextInput label="Title" name="title" value={bookData.title} onChange={handleInputChange} />
      <TextInput label="Author" name="author" value={bookData.author} onChange={handleInputChange} />
      <TextInput label="Description" name="description" value={bookData.description} onChange={handleInputChange} />
      <label>
        Genre (select multiple):
        <GenreSelect value={bookData.genre} onChange={handleGenreChange} />
        {genreError && <div className="error-message">{genreError}</div>}
      </label>
      <TextInput label="Pages" name="pages" value={bookData.pages} onChange={handleInputChange} />
      <TextInput label="Release Date" name="releaseDate" type="date" value={bookData.releaseDate} onChange={handleInputChange} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
