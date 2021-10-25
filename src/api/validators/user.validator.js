import { body } from 'express-validator'
import i18n from 'i18n'

const userValidator = [
  body('email').isEmail().normalizeEmail().withMessage(() => i18n.__('user-validator.email')),
  body('password').isString().isLength({ min: 8 }).trim().escape().withMessage(() => i18n.__('user-validator.password')),
  body('name').isString().notEmpty().trim().escape().withMessage(() => i18n.__('user-validator.name'))
]

export default userValidator
