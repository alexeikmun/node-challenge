const TestController = ({ router, auth, tryCatch }) => {
  router.get('/test', auth, tryCatch((request, response) => response.send({ saludo: 'Hola Mundo' }
  )))

  return router
}

export default TestController
