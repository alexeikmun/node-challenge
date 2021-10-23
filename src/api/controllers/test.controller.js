const TestController = ({ router, auth }) => {
  router.get('/test', auth, (request, response) => {
    console.log('You call me')
    return response.send({ saludo: 'Hola Mundo' })
  })

  return router
}

export default TestController