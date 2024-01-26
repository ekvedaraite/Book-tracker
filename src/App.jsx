// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../src/scss/styles.scss';
import BooksPage from './pages/BooksPage';
import AddBooksPage from './pages/AddBooksPage';
import BookLogsPage from './pages/BookLogsPage';
import AddLogPage from './pages/AddLogPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-books" element={<AddBooksPage />} />
        <Route path="/" element={<BooksPage />} />
        <Route path="/book-logs/:id" element={<BookLogsPage />} />
        <Route path="/books/:id/add-log" element={<AddLogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
