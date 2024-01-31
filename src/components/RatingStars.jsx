import React, { useState, useEffect } from 'react'

const RatingStars = ({ logs, bookId }) => {
  // State to store the rating of the book
  const [rating, setRating] = useState(null)
  useEffect(() => {
    // Check if bookId is missing and log an error
    if (!bookId) {
      console.error('BookId prop is missing in RatingStars component.')
      return
    }
    // Filter and sort logs for the specific bookId by date in descending order
    const sortedLogs = logs.filter((log) => log.bookId === bookId).sort((a, b) => new Date(b.date) - new Date(a.date))
    // Set the rating based on the latest log or null if not found
    setRating(sortedLogs.length > 0 ? sortedLogs[0].rating : null)
  }, [logs, bookId])
  // Total number of stars
  const totalStars = 5
  // Function to render stars based on the rating
  const renderStars = () => {
    if (rating !== null) {
      // Array to store individual star elements
      const stars = []
      // Loop to create stars based on the rating
      for (let i = 1; i <= totalStars; i++) {
        stars.push(
          // Render a yellow star if i is less than or equal to the rating, otherwise render a regular star
          <span key={i} className={i <= rating ? 'star-yellow' : 'star'}>
            ★
          </span>
        )
      }
      return stars
    } else {
      // Return null if rating is null
      return null
    }
  }
  // Render the rating container with stars
  return <div className="rating-container">{renderStars()}</div>
}

export default RatingStars
