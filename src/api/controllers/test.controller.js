const TestController = ({ router }) => {
  router.get('/test', (request, response) => {
    response.send({ gretting: 'Hi developer, May the force be with you' })
  })

  return router
}

export default TestController
