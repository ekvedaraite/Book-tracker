// EditLogForm.jsx
import React, { useState } from 'react';

const EditLogForm = ({ log, onSave, onCancel }) => {
  const [editedLog, setEditedLog] = useState({
    date: log.date,
    page: log.page || '',
    comment: log.comment || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLog((prevLog) => ({ ...prevLog, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleSave = () => {
    // Pass the logId along with the editedLog
    onSave({ ...editedLog, id: log.id });
  };

  return (
    <div className="edit-log-form">
      <label>Date:</label>
      <input type="date" name="date" value={editedLog.date} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <label>Page:</label>
      <input type="text" name="page" value={editedLog.page} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <label>Comment:</label>
      <textarea name="comment" value={editedLog.comment} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditLogForm;
