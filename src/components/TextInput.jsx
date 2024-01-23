// TextInput.jsx
import React from 'react';

const TextInput = ({ label, name, value, onChange, type = 'text' }) => {
  return (
    <label>
      {label}:
      <input type={type} name={name} value={value} onChange={onChange} />
    </label>
  );
};

export default TextInput;
