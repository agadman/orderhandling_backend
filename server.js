import Hapi from '@hapi/hapi'
import dotenv from 'dotenv'

dotenv.config()

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    cors: true
  }
})

const start = async () => {
  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

start()