import { param, query } from 'express-validator'
import i18n from 'i18n'

const idValidator = param('id').isMongoId().notEmpty().withMessage(() => i18n.__('generic-validator.id'))
const timeZoneValidator = query('timeZone').isString().notEmpty(() => i18n.__('generic-validator.time-zone'))

export {
  idValidator,
  timeZoneValidator
}
