// Assuming this is part of your BookLogsPage.jsx file

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import LogCard from '../components/LogCard';

const BookLogsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});
  const [bookLogs, setBookLogs] = useState([]);

  useEffect(() => {
    // Fetch book details and log data from the API
    fetch(`http://localhost:4000/books?id=${id}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          console.log('Fetched book details:', data[0]);
          setBookDetails(data[0]);
        } else {
          console.error('No book details found in the response:', data);
        }
      })
      .catch(error => console.error('Error fetching book details:', error));

    fetch(`http://localhost:4000/logs?bookId=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched book logs:', data);
        setBookLogs(data);
      })
      .catch(error => console.error('Error fetching book logs:', error));
  }, [id]);

  console.log('bookDetails in BookLogsPage:', bookDetails);

  const handleDeleteLog = (logId) => {
    // Perform log deletion logic using API function
    fetch(`http://localhost:4000/logs/${logId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Remove the deleted log from the state
        setBookLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
      })
      .catch((error) => console.error('Error deleting log:', error));
  };

  const handleAddLog = () => {
    // Navigate to the log creation page
    navigate(`/books/${id}/add-log`);
  };

  return (
    <div className='bookLogsPageDiv'>
      <div className='header'>
        <h2>Book Logs for {bookDetails.title}</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
      <BookDetails bookDetails={bookDetails} onAddLogClick={handleAddLog} />
      <div className='log-cards'>
        {bookLogs.map((log) => (
          <LogCard key={log.id} log={log} onDeleteClick={handleDeleteLog} />
        ))}
      </div>
    </div>
  );
};

export default BookLogsPage;
