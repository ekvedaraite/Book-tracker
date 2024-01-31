// BookLogsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BookDetails from '../components/BookDetails';
import LogCard from '../components/LogCard';
import api from '../utils/api';
import { useDarkMode } from '../components/DarkModeContext'; // Import the context hook
import Loading from '../components/Loading'; // Import the Loading component

const BookLogsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const [bookDetails, setBookDetails] = useState({});
  const [bookLogs, setBookLogs] = useState([]);
  const { isDarkMode } = useDarkMode(); // Use the context hook

  useEffect(() => {
    // Set loading to true when starting to fetch data
    setLoading(true);

    // Fetch book details and log data from the API
    Promise.all([
      api.getBookDetails(id),
      api.getBookLogs(id)
    ])
      .then(([bookDetailsData, bookLogsData]) => {
        console.log('Fetched book details:', bookDetailsData);
        console.log('Fetched book logs:', bookLogsData);

        setBookDetails(bookDetailsData);
        setBookLogs(bookLogsData);

        // Set loading to false once both requests are complete
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [id]);

  const handleDeleteLog = (logId) => {
    // Perform log deletion logic using API function
    api.deleteLog(logId)
      .then(() => {
        // Remove the deleted log from the state
        setBookLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
      })
      .catch((error) => console.error('Error deleting log:', error));
  };

  const handleSaveLog = (updatedLog) => {
    // Perform the PATCH request with the updatedLog data
    api.updateLog(updatedLog.id, updatedLog)
      .then(() => {
        // After successfully updating the log, trigger the onSave callback
        setBookLogs((prevLogs) => prevLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log)));
      })
      .catch((error) => {
        console.error('Error updating log:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  const handleAddLog = () => {
    // Navigate to the log creation page
    navigate(`/books/${id}/add-log`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`bookLogsPageDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Book Logs for {bookDetails.title}</h2>
        <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={() => navigate('/')}>Go Back</button>
      </div>
      <BookDetails bookDetails={bookDetails} onAddLogClick={handleAddLog} />
      <div className="log-cards">
        <AnimatePresence>
          {bookLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LogCard log={log} onDeleteClick={handleDeleteLog} onSaveEdit={handleSaveLog} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookLogsPage;
