import i18n from 'i18n'

const TestController = ({ router, auth, tryCatch }) => {
  router.get('/test', auth, tryCatch((request, response) => response.send({ saludo: i18n.__('test.message') }
  )))

  return router
}

export default TestController
