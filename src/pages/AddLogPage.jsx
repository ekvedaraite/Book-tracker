// AddLogPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LogForm from '../components/LogForm';
import api from '../utils/api';
import { useDarkMode } from '../components/DarkModeContext';
import Loading from '../components/Loading'; // Import the Loading component

const AddLogPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const [page, setPage] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [finished, setFinished] = useState(false);
  const [date, setDate] = useState('');
  const [bookDetails, setBookDetails] = useState({});

  useEffect(() => {
    // Fetch book details from the API
    api.getBookDetails(id)
      .then(data => {
        setBookDetails(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [id]);

  const handleAddLog = (e) => {
    e.preventDefault();

    // Validation checks
    const currentDate = new Date().toISOString().split('T')[0];

    if (!date) {
      alert('Please enter a date');
      return;
    }

    if (date > currentDate) {
      alert('Date cannot be in the future');
      return;
    }

    if (!page) {
      alert('Please enter a page number');
      return;
    }

    const parsedPage = parseInt(page);

    if (isNaN(parsedPage) || parsedPage < 0 || parsedPage > bookDetails.pages) {
      alert(`Invalid page number (should be between 0 and ${bookDetails.pages})`);
      return;
    }

    if (!comment) {
      alert('Please enter a comment');
      return;
    }

    if (finished && (isNaN(rating) || rating < 0 || rating > 5)) {
      alert('Invalid rating (should be between 0 and 5)');
      return;
    }

    const logData = {
      bookId: id,
      date: date,
      page: parsedPage,
      comment,
      rating: finished ? parseInt(rating) : null,
    };

    setLoading(true); // Set loading to true before starting the log addition process

    // Use your API function to add the log
    api.addLog(logData)
      .then(() => {
        // Navigate back to the book logs page for the current book
        navigate(`/book-logs/${id}`);
      })
      .catch((error) => {
        console.error('Error adding log:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`addBookLogPage ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Add Log for {bookDetails.title}</h2>
      </div>
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
  );
};

export default AddLogPage;
