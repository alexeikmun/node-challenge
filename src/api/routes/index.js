import * as controllers from '../controllers'

const Routes = (router, auth) => {
  let controller

  for (controller in controllers) {
    controllers[controller](router, auth)
  }

  return router
}

export default Routes
