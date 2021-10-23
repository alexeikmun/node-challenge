import * as controllers from '../controllers'

const Routes = (router) => {
  let controller

  for (controller in controllers) {
    controllers[controller](router)
  }

  return router
}

export default Routes
