// FilterSortSection component for filtering and sorting books
const FilterSortSection = ({ isDarkMode, authors, selectedAuthor, sortCriteria, handleAuthorChange, handleSortChange }) => (
  <div className={`filterAndSortDiv ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    {/* Filtering Section */}
    <div className="filteringSection">
      {/* Filter by Author Label */}
      <label className={`filterByAuthor ${isDarkMode ? 'dark-mode' : 'light-mode'}`} htmlFor="authorFilter">Filter by Author:</label>
      {/* Author Selection Dropdown */}
      <select id="authorFilter" value={selectedAuthor} onChange={handleAuthorChange} className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <option value="">All Authors</option>
        {/* Mapping authors to options */}
        {authors.map(author => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>
    </div>
    {/* Sorting Section */}
    <div className="sortingSection">
      {/* Sort By Label */}
      <label className={`sortBy ${isDarkMode ? 'dark-mode' : 'light-mode'}`} htmlFor="sortCriteria">Sort by:</label>
      {/* Sort Criteria Selection Dropdown */}
      <select id="sortCriteria" value={sortCriteria} onChange={handleSortChange} className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <option value="">None</option>
        <option value="highestRating">Rating (highest to lowest)</option>
        <option value="lowestRating">Rating (lowest to highest)</option>
        <option value="latestUpdated">Updated (latest)</option>
        <option value="newestReleaseDate">Release Date (newest)</option>
        <option value="oldestReleaseDate">Release Date (oldest)</option>
      </select>
    </div>
  </div>
)

export default FilterSortSection
