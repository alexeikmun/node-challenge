import { body } from 'express-validator'

const userValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email'),
  body('password').isString().isLength({ min: 8 }).trim().escape().withMessage('At least 8 characters'),
  body('name').isString().trim().escape().withMessage('Must be a valid string')
]

export default userValidator
