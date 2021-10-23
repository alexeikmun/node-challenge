const TestController = (router) => {
  router.get('/test', (request, response) => {
    console.log('You call me')
    return response.send({ saludo: 'Hola Mundo' })
  })
}

export default TestController
