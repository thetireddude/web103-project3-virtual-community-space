function LocationFilter({ locations }) {
  const formatLocation = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleLocationSelect = (e) => {
    const selectedLocation = e.target.value;
    if (selectedLocation) {
      window.location.href = `/location/${selectedLocation}`;
    }
  };

  const handleShowAll = () => {
    window.location.href = "/";
  };

  return (
    <div className="filter-bar">
      <select
        className="location-select"
        onChange={handleLocationSelect}
        defaultValue=""
      >
        <option value="">See events at...</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {formatLocation(location)}
          </option>
        ))}
      </select>
      <button className="show-all-btn" onClick={handleShowAll}>
        Show All Events
      </button>
    </div>
  );
}

export default LocationFilter;
