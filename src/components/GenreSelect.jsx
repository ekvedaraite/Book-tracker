// GenreSelect.jsx
import React from 'react';
import Select from 'react-select';
import genreOptions from './GenreSelectOptions';

const GenreSelect = ({ value = [], onChange }) => {
  const selectedGenres = value.map((genre) => ({ label: genre, value: genre }));

  const handleSelectChange = (selectedOptions) => {
    const selectedGenres = selectedOptions.map((option) => option.value);
    onChange(selectedGenres);
  };

  return (
    <Select
      isMulti
      options={genreOptions.map((genre) => ({ label: genre, value: genre }))}
      value={selectedGenres}
      onChange={handleSelectChange}
    />
  );
};

export default GenreSelect;
