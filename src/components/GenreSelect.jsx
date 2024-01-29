import React from 'react';
import Select from 'react-select';
import genreOptions from './GenreSelectOptions';
import { useDarkMode } from '../components/DarkModeContext'; // Import the context hook

const GenreSelect = ({ value = [], onChange }) => {
  const { isDarkMode } = useDarkMode(); // Use the context hook

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#000' : '$cream',
      borderColor: isDarkMode ? '$light-green' : '$darker-green',
      borderWidth: 2, // Set the border width explicitly
      color: isDarkMode ? '$light-green' : '$darker-green',
      '&:hover': {
        borderColor: isDarkMode ? '$light-green' : '$darker-green',
        cursor: 'pointer',
      },
    }),
    input: (provided, state) => ({
      ...provided,
      color: isDarkMode ? '$light-green' : '$darker-green',
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: isDarkMode ? '$light-green' : '$darker-green',
      '&:hover': {
        border: `1px solid ${isDarkMode ? '$light-green' : '$darker-green'}`, // Set border color on hover
        cursor: 'pointer',
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#000' : '$cream',
      borderColor: isDarkMode ? '$light-green' : '$darker-green',
      borderRadius: '5px',
    }),
  };

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
      styles={customStyles}
    />
  );
};

export default GenreSelect;
