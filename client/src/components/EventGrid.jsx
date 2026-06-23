import EventCard from './EventCard'

function EventGrid({ events }) {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <p>No events found for this city.</p>
      </div>
    )
  }

  return (
    <div className="event-grid">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventGrid
