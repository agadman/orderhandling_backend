const productRoutes = (server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return { message: 'API is running' }
    }
  })
}

export default productRoutes