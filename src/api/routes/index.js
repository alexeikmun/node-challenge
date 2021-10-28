import * as controllers from '../controllers'

const Routes = (config) => {
  let controller

  for (controller in controllers) {
    console.log('controller -->', controllers[controller])
    controllers[controller](config)
  }

  return config.router
}

export default Routes
