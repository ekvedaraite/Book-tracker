// LogForm.jsx
import React from 'react';

const LogForm = ({
  page,
  comment,
  rating,
  setPage,
  setComment,
  setRating,
  finished,
  setFinished,
  handleAddLog,
}) => (
  <form onSubmit={handleAddLog}>
    <label>
      Page:
      <input
        type="number"
        value={page}
        onChange={(e) => setPage(e.target.value)}
      />
    </label>
    <br />
    <label>
      Comment:
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </label>
    <br />
    {finished && (
      <>
        <label>
          Rating (out of 5):
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <br />
      </>
    )}
    <button type="submit">Add Log</button>
  </form>
);

export default LogForm;
