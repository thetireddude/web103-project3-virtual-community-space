import { useState, useEffect } from 'react'
import { getAllEvents } from '../services/EventsAPI'
import Header from '../components/Header'
import LocationFilter from '../components/LocationFilter'
import EventGrid from '../components/EventGrid'

function EventsPage() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')

  useEffect(() => {
    getAllEvents().then(data => {
      setEvents(data)
      setFilteredEvents(data)
    })
  }, [])

  const locations = [...new Set(events.map(event => event.location_id))]

  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    setFilteredEvents(events.filter(event => event.location_id === location))
  }

  const handleShowAll = () => {
    setSelectedLocation('')
    setFilteredEvents(events)
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <LocationFilter
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
          onShowAll={handleShowAll}
        />
        <EventGrid events={filteredEvents} />
      </main>
    </div>
  )
}

export default EventsPage
