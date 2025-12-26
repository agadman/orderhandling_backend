import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Hapi from '@hapi/hapi'
import productRoutes from './routes/product.route.js'

dotenv.config()

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: true
    }
  })

  // MongoDB connection
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err))

  productRoutes(server)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()