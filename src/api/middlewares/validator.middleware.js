import { validationResult } from 'express-validator'

const ValidatorMiddleware = (request, response, next) => {
  const { STATUS_CODE_BAD_REQUEST, CODE_VALIDATION_ERROR } = process.env
  const errors = validationResult(request)

  console.log('request -->', request.body)

  return (errors.isEmpty())
    ? next()
    : response.status(STATUS_CODE_BAD_REQUEST).send({
      code: Number(CODE_VALIDATION_ERROR),
      message: errors.array()
    })
}

export default ValidatorMiddleware
