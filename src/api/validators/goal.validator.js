import { body, param } from 'express-validator'
import i18n from 'i18n'

const goalValidator = [
  body('name').isString().notEmpty().trim().escape().withMessage(() => i18n.__('api.name')),
  body('description').isString().trim().escape().withMessage(() => i18n.__('api.description')),
  body('goalType.id').isMongoId().withMessage(() => i18n.__('goal-validator.invalid-goal-type')),
  body('notificationFrequency.id').isMongoId().withMessage(() => i18n.__('goal-validator.invalid-frequency')),
  body('endDate').isDate().withMessage(() => i18n.__('goal-validator.invalid-endDate'))
]

const goalChangeStatusValidator = [
  param('id').isMongoId().notEmpty().withMessage(() => i18n.__('api.id')),
  body('goalStatus.id').isMongoId().notEmpty().withMessage(() => i18n.__('goal-validator.invalid-goal-status'))
]

export {
  goalChangeStatusValidator,
  goalValidator
}
