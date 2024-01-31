// AddBooksPage.jsx
import React, { useState, useEffect } from 'react';
import AddBookForm from '../components/AddBookForm';
import Loading from '../components/Loading'; // Import the Loading component

const AddBooksPage = ({ isDarkMode }) => {
  const [loading, setLoading] = useState(true);

  // Simulating an asynchronous operation, replace it with your actual logic
  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) for 2 seconds
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={`addBooksPageDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Add a Book</h2>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <AddBookForm />
      )}
    </div>
  );
};

export default AddBooksPage;
