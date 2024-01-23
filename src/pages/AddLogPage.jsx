// AddLogPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LogForm from '../components/LogForm';
import api from '../utils/api'; // Import your API functions

const AddLogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [finished, setFinished] = useState(false);

  const handleAddLog = () => {
    const logData = {
      bookId: id,
      date: new Date().toISOString(),
      page: parseInt(page),
      comment,
      rating: finished ? parseInt(rating) : null,
    };

    // Use your API function to add the log
    api.addLog(logData)
      .then(() => {
        // Navigate back to the book logs page
        navigate(`/books/${id}/logs`);
      })
      .catch((error) => console.error('Error adding log:', error));
  };

  return (
    <div>
      <h2>Add Log for Book</h2>
      <LogForm
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
