import { body } from 'express-validator'
import i18n from 'i18n'

const rightThingValidator = body('description').isString().trim().escape().notEmpty().withMessage(() => i18n.__('api.description'))

export default rightThingValidator
