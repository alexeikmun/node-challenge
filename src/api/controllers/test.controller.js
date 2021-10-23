const TestController = ({ router, auth }) => {
  router.get('/test', auth, (request, response) => response.send({ 
    saludo: 'Hola Mundo' }
  ))

  return router
}

export default TestController
