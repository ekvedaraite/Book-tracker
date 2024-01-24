// LogCard.jsx
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LogCard = ({ log, onDeleteClick }) => (
  <div className="log-card">
    <div className="trash-icon" onClick={() => onDeleteClick(log.id)}>
      <FaTrashAlt />
    </div>
    <div className="card-content">
      <p><strong>Date:</strong> {log.date}</p>
      <p><strong>Page:</strong> {log.page ?? 'N/A'}</p>
      <p><strong>Comment:</strong> {log.comment}</p>
    </div>
  </div>
);

export default LogCard;
