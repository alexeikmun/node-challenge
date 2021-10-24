const TryCatchMiddleware = (endpoint) => {
  return async (request, response, next) => {
    try {
      await endpoint(request, response, next)
    } catch (error) {
      next(error)
    }
  }
}

export default TryCatchMiddleware
