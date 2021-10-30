import { body } from 'express-validator'
import i18n from 'i18n'

const notificationFrequencyValidator = [
  body('name').isString().notEmpty().trim().escape().withMessage(() => i18n.__('api.name')),
  body('description').isString().trim().escape().withMessage(() => i18n.__('api.description'))
]

export default notificationFrequencyValidator
