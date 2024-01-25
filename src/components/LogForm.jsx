import React from 'react';
import { motion } from 'framer-motion';

const PageNumberInput = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input is a valid number (including negative sign)
    const isValidNumber = /^-?\d*$/.test(inputValue);

    // If valid, update the state, otherwise, keep the previous value
    onChange(isValidNumber ? inputValue : value);
  };

  return (
    <div>
      <label>Page:</label>
      <input
        type="text"
        pattern="-?\d*"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

const LogForm = ({
  date,
  setDate,
  page,
  setPage,
  comment,
  setComment,
  rating,
  setRating,
  finished,
  setFinished,
  handleAddLog,
}) => {
  return (
    <div>
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleAddLog}
      >
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <PageNumberInput value={page} onChange={setPage} />
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        {finished && (
          <div>
            <label>Rating (out of 5):</label>
            <input
              type="text"
              min="1"
              max="5"
              inputMode="numeric"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        )}
        <div className='finishedDiv'>
          <label className='finishedLabel'>Finished Reading:</label>
          <input
            type="checkbox"
            checked={finished}
            className='checkbox'
            onChange={(e) => setFinished(e.target.checked)}
          />
        </div>
        <button type="submit">Add Log</button>
      </motion.form>
    </div>
  );
};

export default LogForm;
