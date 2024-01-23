// AddBooksPage.jsx
import React from 'react';
import AddBookForm from '../components/AddBookForm';

const AddBooksPage = () => {
  return (
    <div className='addBooksPageDiv'>
      <div className="header">
      <h2>Add a Book</h2>
      </div>
      <AddBookForm />
    </div>
  );
};

export default AddBooksPage;
