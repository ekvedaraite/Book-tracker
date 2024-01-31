import { motion } from 'framer-motion'
import { useDarkMode } from '../components/DarkModeContext'
// Custom input for handling page numbers, allowing only numeric input
const PageNumberInput = ({ value, onChange }) => {
  // Handle input change and ensure it is a valid number
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    const isValidNumber = /^-?\d*$/.test(inputValue)
    onChange(isValidNumber ? inputValue : value)
  }
  return (
    <div>
      <label>Page:</label>
      <input
        type="text"
        pattern="-?\d*"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  )
}
// LogForm component for adding logs with motion animations
const LogForm = ({
  date,
  setDate,
  page,
  setPage,
  comment,
  setComment,
  rating,
  setRating,
  finished,
  setFinished,
  handleAddLog,
}) => {
  // Get dark mode state
  const { isDarkMode } = useDarkMode()
  return (
    <div className={`AddLogPage ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Form with motion animations */}
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleAddLog}
      >
        {/* Date input */}
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {/* Custom PageNumberInput component */}
        <PageNumberInput value={page} onChange={setPage} />
        {/* Comment textarea */}
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        {/* Rating input (shown only when finished reading) */}
        {finished && (
          <div>
            <label>Rating (out of 5):</label>
            <input
              type="text"
              min="1"
              max="5"
              inputMode="numeric"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        )}
        {/* Checkbox for marking finished reading */}
        <div className='finishedDiv'>
          <label className='finishedLabel'>Finished Reading:</label>
          <input
            type="checkbox"
            checked={finished}
            className='checkbox'
            onChange={(e) => setFinished(e.target.checked)}
          />
        </div>
        {/* Submit button */}
        <button className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`} type="submit">Add Log</button>
      </motion.form>
    </div>
  )
}

export default LogForm
