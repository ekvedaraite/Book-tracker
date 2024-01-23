// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/scss/styles.scss'
import BooksPage from './pages/BooksPage';
import AddBooksPage from './pages/AddBooksPage';
import BookLogsPage from './pages/BookLogsPage';
import AddLogPage from './pages/AddLogPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-books" element={<AddBooksPage />} />
        <Route path="/" element={<BooksPage />} />
        <Route path="/book-logs/:id" element={<BookLogsPage />} />
        <Route path="/books/:id/add-log" element={<AddLogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
