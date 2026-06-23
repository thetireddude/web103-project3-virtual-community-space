function LocationFilter({ locations, selectedLocation, onLocationChange, onShowAll }) {
  const formatLocation = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="filter-bar">
      <select
        className="location-select"
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        <option value="" disabled>See events at...</option>
        {locations.map(location => (
          <option key={location} value={location}>
            {formatLocation(location)}
          </option>
        ))}
      </select>
      <button className="show-all-btn" onClick={onShowAll}>
        Show All Events
      </button>
    </div>
  )
}

export default LocationFilter
