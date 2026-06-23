import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import eventRoutes from './routes/events.js'

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('FIFA 2026 Match Hub API')
})

app.use('/', eventRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
