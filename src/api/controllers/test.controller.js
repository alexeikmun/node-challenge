import i18n from 'i18n'

const TestController = ({ router, tryCatch }) => {
  router.get('/test', tryCatch((request, response) => {
    response.send({ gretting: i18n.__('test.message') })
  }))

  return router
}

export default TestController
