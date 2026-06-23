import { useState, useEffect } from "react";
import { getAllEvents, getEventsByLocation } from "../services/EventsAPI";
import Header from "../components/Header";
import LocationFilter from "../components/LocationFilter";
import EventGrid from "../components/EventGrid";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname === "/") {
      getAllEvents().then((data) => {
        setEvents(data);
        setLocations([...new Set(data.map((event) => event.location_id))]);
      });
    } else if (pathname.startsWith("/location/")) {
      const locationId = pathname.split("/location/")[1];
      getEventsByLocation(locationId).then((data) => {
        setEvents(data);
        getAllEvents().then((allData) => {
          setLocations([...new Set(allData.map((event) => event.location_id))]);
        });
      });
    }
  }, [window.location.pathname]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <LocationFilter locations={locations} />
        <EventGrid events={events} />
      </main>
    </div>
  );
}

export default EventsPage;
