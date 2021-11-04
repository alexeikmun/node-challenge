import { param } from 'express-validator'
import i18n from 'i18n'

const idValidator = param('id').isMongoId().notEmpty().withMessage(() => i18n.__('generic-validator.id'))

export {
  idValidator
}
