// NotFoundPage.jsx
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='notFoundPageDiv'>
        <div className="header">
      <h2>404 - Not Found</h2>
        </div>
      <p>The page you are looking for does not exist.</p>

      <iframe className='gif' src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
  );
};

export default NotFoundPage;
