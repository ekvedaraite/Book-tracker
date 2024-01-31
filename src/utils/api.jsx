const API_URL = 'http://localhost:4000'
// Handle the response from API calls
const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }
  return response.json()
}
// Handle errors during API calls
const handleError = (error) => {
  console.error('API Error:', error)
  throw error
}
// Function to add a log entry
const addLog = (logData) => {
  const url = `${API_URL}/logs`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  })
    .then(handleResponse)
    .catch(handleError)
}
// Function to get book details by ID
const getBookDetails = (bookId) => {
  const url = `${API_URL}/books?id=${bookId}`
  return fetch(url)
    .then(handleResponse)
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        return data[0]
      } else {
        throw new Error('No book details found in the response')
      }
    })
    .catch(handleError)
}
// Function to get logs for a specific book
const getBookLogs = (bookId) => {
  const url = `${API_URL}/logs?bookId=${bookId}`
  return fetch(url)
    .then(handleResponse)
    .catch(handleError)
}
// Function to update a log entry
const updateLog = (logId, logData) => {
  const url = `${API_URL}/logs/${logId}`
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  })
    .then(handleResponse)
    .catch(handleError)
}
// Function to delete a log entry
const deleteLog = (logId) => {
  const url = `${API_URL}/logs/${logId}`
  return fetch(url, {
    method: 'DELETE',
  })
    .then(handleResponse)
    .catch(handleError)
}
// Export the functions as part of the API module
export default { addLog, getBookDetails, getBookLogs, updateLog, deleteLog }
