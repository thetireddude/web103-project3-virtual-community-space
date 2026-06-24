import { pool } from './database.js'

const seed = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS events')

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        image_url TEXT NOT NULL,
        location_id TEXT NOT NULL
      )
    `)

    await pool.query(`
      INSERT INTO events (name, date, time, image_url, location_id) VALUES
        ('Opening Week Celebration', 'June 11, 2026', '7:00 PM', 'https://images.unsplash.com/photo-1781908795500-1722d59e9438?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'los-angeles'),
        ('Group Stage Matchday 1', 'June 15, 2026', '3:00 PM', 'https://images.unsplash.com/photo-1607960708254-60fb0ba03f4d?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'los-angeles'),
        ('Fan Festival', 'June 18, 2026', '12:00 PM', 'https://images.unsplash.com/photo-1717233517685-4c3b567adf83?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'dallas'),
        ('Post-Game Celebrations', 'June 22, 2026', '1:00 PM', 'https://images.unsplash.com/photo-1716463312675-60d38dd96d82?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'dallas'),
        ('Quarterfinal Watch Party', 'July 3, 2026', '6:00 PM', 'https://images.unsplash.com/photo-1760973501331-c3dc3ab81497?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'atlanta'),
        ('Community Soccer Festival', 'June 25, 2026', '10:00 AM', 'https://images.unsplash.com/photo-1658051593145-e386ca3ecffa?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'atlanta'),
        ('Semifinal Viewing Event', 'July 9, 2026', '8:00 PM', 'https://images.unsplash.com/photo-1763194796048-8502ad24d912?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ', 'miami'),
        ('Closing Celebration', 'July 19, 2026', '5:00 PM', 'https://images.unsplash.com/photo-1563223206-9718491bef59?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'miami'),
        ('Group Stage Game 2', 'June 20, 2026', '2:00 PM', 'https://images.unsplash.com/photo-1665413813191-3143ec934960?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'seattle'),
        ('Fan Zone Opening', 'June 14, 2026', '11:00 AM', 'https://images.unsplash.com/photo-1731870881782-1948058d9ce1?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'new-york-new-jersey')
    `)

    console.log('Database seeded successfully.')
  } catch (error) {
    console.error('Seed error:', error.message)
  } finally {
    await pool.end()
  }
}

seed()
