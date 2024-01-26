const API_URL = 'http://localhost:4000';

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return response.json();
};

const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

const addLog = (logData) => {
  const url = `${API_URL}/logs`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const getBookDetails = (bookId) => {
  const url = `${API_URL}/books?id=${bookId}`;
  return fetch(url)
    .then(handleResponse)
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      } else {
        throw new Error('No book details found in the response');
      }
    })
    .catch(handleError);
};

const getBookLogs = (bookId) => {
  const url = `${API_URL}/logs?bookId=${bookId}`;
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
};

const updateLog = (logId, logData) => {
  const url = `${API_URL}/logs/${logId}`;
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const deleteLog = (logId) => {
  const url = `${API_URL}/logs/${logId}`;
  return fetch(url, {
    method: 'DELETE',
  })
    .then(handleResponse)
    .catch(handleError);
};

export default { addLog, getBookDetails, getBookLogs, updateLog, deleteLog };
