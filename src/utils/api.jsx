// api.jsx
const API_URL = 'http://localhost:4000';

const addLog = (logData) => {
  const url = `${API_URL}/logs`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
};

const getBookDetails = (bookId) => {
  const url = `${API_URL}/books?id=${bookId}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      } else {
        throw new Error('No book details found in the response');
      }
    });
};

const getBookLogs = (bookId) => {
  const url = `${API_URL}/logs?bookId=${bookId}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
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
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
};

const deleteLog = (logId) => {
  const url = `${API_URL}/logs/${logId}`;
  return fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    });
};

export default { addLog, getBookDetails, getBookLogs, updateLog, deleteLog };
