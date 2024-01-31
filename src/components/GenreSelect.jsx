import Select from 'react-select'
import genreOptions from './GenreSelectOptions'
import { useDarkMode } from '../components/DarkModeContext'
// GenreSelect component for selecting genres using react-select
const GenreSelect = ({ value = [], onChange }) => {
  // Accessing dark mode status from the context
  const { isDarkMode } = useDarkMode()
  // Custom styles for react-select components
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#000' : '$cream',
      borderColor: isDarkMode ? '$light-green' : '$darker-green',
      borderWidth: 2,
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
        border: `1px solid ${isDarkMode ? '$light-green' : '$darker-green'}`,
        cursor: 'pointer',
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#000' : '$cream',
      borderColor: isDarkMode ? '$light-green' : '$darker-green',
      borderRadius: '5px',
    }),
  }
  // Convert selected genres to react-select format
  const selectedGenres = value.map((genre) => ({ label: genre, value: genre }))
  // Handle change in selected genres
  const handleSelectChange = (selectedOptions) => {
    const selectedGenres = selectedOptions.map((option) => option.value)
    onChange(selectedGenres)
  }
  return (
    // Render the react-select component with custom styles
    <Select
      isMulti
      options={genreOptions.map((genre) => ({ label: genre, value: genre }))}
      value={selectedGenres}
      onChange={handleSelectChange}
      styles={customStyles}
    />
  )
}

export default GenreSelect
