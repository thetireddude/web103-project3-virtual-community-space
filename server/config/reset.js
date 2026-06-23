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
        ('Opening Week Celebration', 'June 11, 2026', '7:00 PM', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', 'los-angeles'),
        ('Group Stage Matchday', 'June 15, 2026', '3:00 PM', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800', 'los-angeles'),
        ('Fan Festival', 'June 18, 2026', '12:00 PM', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800', 'dallas'),
        ('Matchday Tailgate', 'June 22, 2026', '1:00 PM', 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800', 'dallas'),
        ('Quarterfinal Watch Party', 'July 3, 2026', '6:00 PM', 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800', 'atlanta'),
        ('Community Soccer Festival', 'June 25, 2026', '10:00 AM', 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800', 'atlanta'),
        ('Semifinal Viewing Event', 'July 9, 2026', '8:00 PM', 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800', 'miami'),
        ('Closing Celebration', 'July 19, 2026', '5:00 PM', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800', 'miami'),
        ('Group Stage Watch Party', 'June 20, 2026', '2:00 PM', 'https://images.unsplash.com/photo-1551958219-acbc595b16bc?w=800', 'seattle'),
        ('Fan Zone Opening', 'June 14, 2026', '11:00 AM', 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800', 'new-york-new-jersey')
    `)

    console.log('Database seeded successfully.')
  } catch (error) {
    console.error('Seed error:', error.message)
  } finally {
    await pool.end()
  }
}

seed()
