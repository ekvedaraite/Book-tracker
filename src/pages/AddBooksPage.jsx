// AddBooksPage.jsx
import React from 'react';
import AddBookForm from '../components/AddBookForm';

const AddBooksPage = ({ isDarkMode }) => {
  return (
    <div className={`addBooksPageDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Add a Book</h2>
      </div>
      <AddBookForm />
    </div>
  );
};

export default AddBooksPage;
