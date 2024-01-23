// BookDetails.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookDetails = ({ bookDetails, onAddLogClick }) => (
  <div className='bookDetailsDiv'>
    <div className='imageContainer'>
      <img className='bookLogImg' src={bookDetails.img} alt={bookDetails.title} />
    </div>
    <div className='bookInfo'>
      <p><strong>Title:</strong> {bookDetails.title}</p>
      <p><strong>Author:</strong> {bookDetails.author}</p>
      <p><strong>Description:</strong> {bookDetails.description}</p>
      <p><strong>Genre:</strong> {bookDetails.genre && bookDetails.genre.join(', ')}</p>
      <p><strong>Pages:</strong> {bookDetails.pages}</p>
      <p><strong>Publication date:</strong> {bookDetails.releaseDate}</p>
      <button onClick={onAddLogClick}>Add Log</button>
    </div>
  </div>
);

export default BookDetails;
