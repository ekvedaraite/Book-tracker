// LogCard.jsx
import React, { useState } from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import EditLogForm from './EditLogForm';

const LogCard = ({ log, onDeleteClick, onSaveEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (updatedLog) => {
    setIsEditing(false);
    onSaveEdit && onSaveEdit(updatedLog);
  };

  return (
    <motion.div
      key={log.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="log-card"
    >
      <div className="actions">
        <div className="trash-icon" onClick={() => onDeleteClick(log.id)}>
          <FaTrashAlt />
        </div>
        {isEditing ? (
          <EditLogForm log={log} onCancel={handleCancelEdit} onSave={(updatedLog) => handleSaveEdit(updatedLog, log.id)} />
        ) : (
          <div className="edit-icon" onClick={handleEditClick}>
            <FaRegEdit />
          </div>
        )}
      </div>
      {!isEditing && (
        <div className="card-content">
          <p><strong>Date:</strong> {log.date}</p>
          <p><strong>Page:</strong> {log.page ?? 'N/A'}</p>
          <p className='logComment'><strong>Comment:</strong> <br/><span className="comment-text">{log.comment}</span></p>
        </div>
      )}
    </motion.div>
  );
};

export default LogCard;
