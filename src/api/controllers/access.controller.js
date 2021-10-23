const AccessController = (router) => {
  router.post('/user/login', (request, response) => {
    console.log('body -->', request.body)
    const { user, password } = request.body

    return response.send({ user, password })
  })

  router.post('/user/sign-up', (request, response) => {
    const { user, password } = request.body

    return response.send({ user, password })
  })

  router.post('/user/recovery-password', (request, response) => {
    const { user } = request.body
    return response.send({ user })
  })

  return router
}

export default AccessController
