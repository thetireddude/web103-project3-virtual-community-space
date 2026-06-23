# FIFA 2026 Match Hub — Implementation Specification

## Overview

Build a full-stack Virtual Community Space web application using:

- Vite React
- Express
- PostgreSQL (Render)
- pg
- React Hooks (`useEffect`, `useState`)
- Fetch API

The application should allow users to explore FIFA 2026 World Cup-related events occurring in different host cities across the United States.

Users should be able to:

- View all events
- Filter events by city using a dropdown
- Reset the filter using a "Show All Events" button
- View additional event information when hovering over an event card

This project should follow the overall architecture demonstrated in:

- CodePath Unit 3 Lab
- CodePath Unit 3 Project instructions
- The provided UI screenshots

However, the application should be implemented from scratch and should not copy the example project directly.

---

# Functional Requirements

## Required Features

### Backend

- Express server
- PostgreSQL database hosted on Render
- Database connection using `pg`
- Single database table called `events`
- Seed script to create and populate the database
- API endpoint to retrieve all events

### Frontend

- React application built with Vite
- Fetch event data from the backend
- Display event cards in a responsive grid
- Dropdown populated from backend data
- Filter events by city
- Show all events button
- Event details revealed on hover
- Styled FIFA World Cup themed interface

---

# User Experience

## Default State

When a user opens the application:

1. All events are displayed.
2. Dropdown displays a placeholder option.
3. Event cards appear in a responsive grid.

---

## Filtering

When a location is selected:

1. Only events matching that location are displayed.
2. Other events are hidden.

Filtering should happen entirely on the frontend.

No additional API requests are necessary.

---

## Show All Events

When the Show All Events button is clicked:

1. The selected location is cleared.
2. All events become visible again.

---

## Event Hover Behavior

Each card should display:

### Default State

- Event image
- Event name

### Hover State

Display an overlay containing:

- Event name
- Event date
- Event time
- Event location

No click behavior is required.

No event detail page is required.

---

# Application Theme

## Theme

The application theme should be:

**FIFA 2026 World Cup Match Hub**

Users are exploring World Cup events occurring in various US host cities.

Examples:

- Match Days
- Fan Festivals
- Watch Parties
- Opening Celebrations
- Community Gatherings

---

## Design Inspiration

Use the screenshots only as inspiration.

Do NOT recreate the design exactly.

The visual style should feel:

- Modern
- Energetic
- Sports-focused
- Event-oriented

Suggested design elements:

- Stadium-inspired visuals
- Bold typography
- Bright colors
- Large hero/header area
- Responsive cards
- Hover interactions

---

# Database Design

## Database

Render PostgreSQL

---

## Table: events

```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    image_url TEXT NOT NULL,
    location_id TEXT NOT NULL
);
```

---

# Location Model

There should NOT be a locations table.

There should NOT be a location API endpoint.

Location information is stored directly inside the events table.

Example values:

```txt
los-angeles
dallas
atlanta
miami
seattle
new-york-new-jersey
```

---

# Seed Data Requirements

Create placeholder data.

Do not preserve any previous project data.

Include:

- Minimum 4 locations
- Minimum 8 events
- Multiple events per location

Example locations:

```txt
Los Angeles
Dallas
Atlanta
Miami
Seattle
New York / New Jersey
```

Example events:

```txt
Opening Week Celebration
Group Stage Matchday
Fan Festival
Quarterfinal Watch Party
Semifinal Viewing Event
Community Soccer Festival
Matchday Tailgate
Closing Celebration
```

---

# Backend Structure

```txt
server/
├── config/
│   ├── database.js
│   └── reset.js
│
├── controllers/
│   └── events.js
│
├── routes/
│   └── events.js
│
├── server.js
├── .env
└── package.json
```

---

# Environment Variables

Create:

```txt
server/.env
```

Contents:

```env
PGUSER=""
PGPASSWORD=""
PGHOST=""
PGPORT=""
PGDATABASE=""
```

Populate using Render PostgreSQL connection values.

---

# Database Connection

File:

```txt
server/config/database.js
```

```js
import pg from 'pg'

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false
  }
}

export const pool = new pg.Pool(config)
```

---

# Seed Script

File:

```txt
server/config/reset.js
```

Responsibilities:

1. Connect to PostgreSQL
2. Drop events table if it exists
3. Create events table
4. Insert placeholder FIFA event data
5. Close database connection

Pseudo-flow:

```txt
DROP TABLE IF EXISTS events

CREATE TABLE events

INSERT sample rows

END CONNECTION
```

---

# Backend Controller

File:

```txt
server/controllers/events.js
```

Implement:

```js
getEvents()
```

Responsibilities:

- Retrieve all events
- Order by id ascending
- Return JSON response

Example:

```js
const getEvents = async (req, res) => {
  try {
    const results = await pool.query(
      'SELECT * FROM events ORDER BY id ASC'
    )

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({
      error: error.message
    })
  }
}
```

Export the function.

---

# Backend Routes

File:

```txt
server/routes/events.js
```

Create router.

Import controller.

Define route:

```txt
GET /events
```

Example:

```js
router.get('/events', getEvents)
```

Export router.

---

# API Endpoints

## Required Endpoint

### Get All Events

```http
GET /events
```

Response:

```json
[
  {
    "id": 1,
    "name": "Opening Week Celebration",
    "date": "June 11, 2026",
    "time": "7:00 PM",
    "image_url": "...",
    "location_id": "los-angeles"
  }
]
```

---

## Do Not Create

```txt
GET /locations

GET /locations/:id

GET /locations/:slug

GET /events/:id
```

These endpoints are not required.

---

# Server Configuration

File:

```txt
server/server.js
```

Requirements:

### Install

```bash
npm install express cors pg dotenv nodemon
```

---

### Middleware

```js
app.use(cors())
app.use(express.json())
```

---

### Root Route

```js
app.get('/', (req, res) => {
  res.send('FIFA 2026 Match Hub API')
})
```

---

### Mount Routes

```js
app.use('/', eventRoutes)
```

---

### Port

```js
3000
```

---

# Frontend Structure

```txt
client/
└── src/
    ├── components/
    │   ├── Header.jsx
    │   ├── LocationFilter.jsx
    │   ├── EventCard.jsx
    │   └── EventGrid.jsx
    │
    ├── pages/
    │   └── EventsPage.jsx
    │
    ├── services/
    │   └── EventsAPI.jsx
    │
    ├── App.jsx
    ├── main.jsx
    └── App.css
```

---

# Frontend API Service

File:

```txt
client/src/services/EventsAPI.jsx
```

```js
const API_URL = 'http://localhost:3000/events'

export const getAllEvents = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()
  return data
}
```

---

# Events Page

File:

```txt
pages/EventsPage.jsx
```

Responsibilities:

## State

```js
events
filteredEvents
selectedLocation
```

---

## Fetch Data

Use:

```js
useEffect()
```

and

```js
getAllEvents()
```

Store results in state.

---

## Generate Dropdown Options

Derive locations from events.

Example:

```js
const locations = [
  ...new Set(
    events.map(event => event.location_id)
  )
]
```

Do not hardcode locations.

---

## Filtering Logic

When a location is selected:

```js
event.location_id === selectedLocation
```

Only matching events should be displayed.

---

## Show All Events

Reset:

```js
selectedLocation
```

and render all events again.

---

# Header Component

File:

```txt
components/Header.jsx
```

Display:

```txt
FIFA 2026 Match Hub
```

Optional subtitle:

```txt
Explore World Cup events across US host cities
```

---

# Location Filter Component

File:

```txt
components/LocationFilter.jsx
```

Props:

```js
locations
selectedLocation
onLocationChange
onShowAll
```

Render:

### Dropdown

Placeholder:

```txt
See events at...
```

Options generated from API data.

---

### Button

```txt
Show All Events
```

Calls:

```js
onShowAll()
```

---

# Event Grid Component

File:

```txt
components/EventGrid.jsx
```

Props:

```js
events
```

Responsibilities:

- Render responsive grid
- Render EventCard for each event

If empty:

```txt
No events found for this city.
```

---

# Event Card Component

File:

```txt
components/EventCard.jsx
```

Props:

```js
event
```

---

## Default State

Display:

- Image
- Event Name

---

## Hover State

Display overlay with:

```txt
Event Name
Date
Time
Location
```

Use CSS hover effects.

No navigation.

No click action.

---

# Routing

Routing is minimal.

No location pages.

No event pages.

Recommended:

```txt
/
```

or

```txt
/ events
```

renders:

```txt
EventsPage
```

Only.

---

# Styling Requirements

Create a polished FIFA-inspired design.

Suggested elements:

### Layout

- Full-width header
- Filter controls beneath header
- Responsive event grid

### Visual Design

- Bold typography
- Stadium-inspired visuals
- Bright sports colors
- Hover transitions
- Large imagery

### Responsiveness

Support:

- Desktop
- Tablet
- Mobile

---

# Package Scripts

## Backend

```json
{
  "type": "module",
  "scripts": {
    "start": "nodemon server.js",
    "reset": "node config/reset.js"
  }
}
```

---

## Frontend

Use standard Vite scripts.

```bash
npm run dev
```

---

# Development Workflow

## Backend

```bash
cd server

npm install

npm run reset

npm run start
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# Acceptance Criteria

The implementation is complete when:

- PostgreSQL is running on Render.
- `npm run reset` creates and seeds the database.
- The events table exists.
- `GET /events` returns all events.
- React fetches events using `useEffect`.
- Event cards render successfully.
- Dropdown options are generated from backend data.
- Selecting a city filters events.
- Show All Events resets filtering.
- Event details appear on hover.
- No location detail pages exist.
- No event detail pages exist.
- The application presents a FIFA 2026 World Cup event experience.