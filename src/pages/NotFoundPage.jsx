// NotFoundPage.jsx
import React from 'react';
import { useDarkMode } from '../components/DarkModeContext';

const NotFoundPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className='notFoundPageDiv'>
        <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>404 - Not Found</h2>
        </div>
      <p>The page you are looking for does not exist.</p>

      <iframe src="https://giphy.com/embed/0RAvDxfdksWy39YG4T" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
    </div>
  );
};

export default NotFoundPage;
