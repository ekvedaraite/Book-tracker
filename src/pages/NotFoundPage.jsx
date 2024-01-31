import { useDarkMode } from '../components/DarkModeContext'

const NotFoundPage = () => {
  // Get dark mode state and toggle function from the context
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <div className='notFoundPageDiv'>
      {/* Header section with dynamic dark/light mode class */}
      <div className={`header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>404 - Not Found</h2>
      </div>

      {/* Message for the not found page */}
      <p>The page you are looking for does not exist.</p>

      {/* Giphy embed for a gif */}
      <iframe src="https://giphy.com/embed/0RAvDxfdksWy39YG4T" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
    </div>
  )
}

export default NotFoundPage
