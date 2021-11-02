import { body } from 'express-validator'
import i18n from 'i18n'

const goalTypeValidator = [
  body('name').isString().notEmpty().trim().escape().withMessage(() => i18n.__('api.name')),
  body('description').isString().notEmpty().trim().escape().withMessage(() => i18n.__('api.description'))
]

export default goalTypeValidator
