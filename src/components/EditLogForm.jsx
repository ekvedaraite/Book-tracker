import React, { useState } from 'react'
import { useDarkMode } from '../components/DarkModeContext'
// EditLogForm component for editing log details
const EditLogForm = ({ log, onSave, onCancel }) => {
  const { isDarkMode } = useDarkMode()
  // State to track edited log details
  const [editedLog, setEditedLog] = useState({
    date: log.date,
    page: log.page || '',
    comment: log.comment || '',
  })
  // Handle input change for date, page, and comment fields
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedLog((prevLog) => ({ ...prevLog, [name]: value }))
  }
  // Handle keydown events, specifically for Enter key to trigger save
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
  }
  // Handle save action
  const handleSave = () => {
    onSave({ ...editedLog, id: log.id })
  }
  return (
    <div className={`edit-log-form ${isDarkMode ? 'dark-mode' : 'light-mode'} ${editedLog.isEditMode ? 'edit-mode' : ''}`}>
      {/* Date input */}
      <label>Date:</label>
      <input type="date" name="date" value={editedLog.date} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      {/* Page input */}
      <label>Page:</label>
      <input type="text" name="page" value={editedLog.page} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      {/* Comment input */}
      <label>Comment:</label>
      <textarea name="comment" value={editedLog.comment} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      {/* Save button */}
      <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={handleSave}>Save</button>
      {/* Cancel button */}
      <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default EditLogForm
