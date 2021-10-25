const TryCatchMiddleware = (endpoint) => async (request, response, next) => {
  try {
    return await endpoint(request, response, next)
  } catch (error) {
    return next(error)
  }
}

export default TryCatchMiddleware
