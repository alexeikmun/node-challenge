import { validationResult } from 'express-validator'

const ValidatorMiddleware = (request, response, next) => {
  const errors = validationResult(request)
  return (errors.isEmpty()) ? next() : response.status(400).send({ code: 400, message: errors.array() })
}

export default ValidatorMiddleware
