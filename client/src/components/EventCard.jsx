function EventCard({ event }) {
  const formatLocation = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="event-card">
      <img src={event.image_url} alt={event.name} className="card-image" />
      <div className="card-default">
        <h3 className="card-name">{event.name}</h3>
      </div>
      <div className="card-overlay">
        <h3 className="overlay-name">{event.name}</h3>
        <p className="overlay-detail">📅 {event.date}</p>
        <p className="overlay-detail">🕐 {event.time}</p>
        <p className="overlay-detail">📍 {formatLocation(event.location_id)}</p>
      </div>
    </div>
  )
}

export default EventCard
