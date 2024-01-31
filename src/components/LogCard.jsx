import React, { useState } from 'react'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { motion } from 'framer-motion'
import EditLogForm from './EditLogForm'
// LogCard component for displaying log information and handling actions
const LogCard = ({ log, onDeleteClick, onSaveEdit }) => {
  // State for tracking editing mode
  const [isEditing, setIsEditing] = useState(false)
  // Handle click event to initiate editing mode
  const handleEditClick = () => {
    setIsEditing(true)
  }
  // Handle click event to cancel editing mode
  const handleCancelEdit = () => {
    setIsEditing(false)
  }
  // Handle save edit event and exit editing mode
  const handleSaveEdit = (updatedLog) => {
    setIsEditing(false)
    onSaveEdit && onSaveEdit(updatedLog)
  }
  return (
    // Framer Motion for animations
    <motion.div
      key={log.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="log-card"
    >
      {/* Actions section with delete and edit icons */}
      <div className="actions">
        <div className="trash-icon" onClick={() => onDeleteClick(log.id)}>
          <FaTrashAlt />
        </div>
        {/* Render EditLogForm or Edit icon based on editing mode */}
        {isEditing ? (
          <EditLogForm log={log} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
        ) : (
          <div className="edit-icon" onClick={handleEditClick}>
            <FaRegEdit />
          </div>
        )}
      </div>
      {/* Display log content if not in editing mode */}
      {!isEditing && (
        <div className="card-content">
          <p><strong>Date:</strong> {log.date}</p>
          <p><strong>Page:</strong> {log.page ?? 'N/A'}</p>
          <p className='logComment'><strong>Comment:</strong> <br/><span className="comment-text">{log.comment}</span></p>
        </div>
      )}
    </motion.div>
  )
}

export default LogCard
