import React, { useState } from 'react';
import { useDarkMode } from '../components/DarkModeContext';

const EditLogForm = ({ log, onSave, onCancel }) => {
  const { isDarkMode } = useDarkMode(); // Use the context hook

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
    <div className={`edit-log-form ${isDarkMode ? 'dark-mode' : 'light-mode'} ${editedLog.isEditMode ? 'edit-mode' : ''}`}>
      <label>Date:</label>
      <input type="date" name="date" value={editedLog.date} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <label>Page:</label>
      <input type="text" name="page" value={editedLog.page} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <label>Comment:</label>
      <textarea name="comment" value={editedLog.comment} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={handleSave}>Save</button>
      <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditLogForm;
