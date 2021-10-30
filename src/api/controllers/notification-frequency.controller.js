import { NotificationFrequencyService } from '../services'
import { notificationFrequencyValidator } from '../validators'
import i18n from 'i18n'

const NotificationFrequencyController = ({ router, auth, validator, tryCatch}) => {
  const notificationFrequencyService = NotificationFrequencyService()
  const { STATUS_CODE_BAD_REQUEST } = process.env

  router.post('/notification-frequency', auth, notificationFrequencyValidator, validator, tryCatch(async (request, response) => {
    const { name, description } = request.body
    const exist = await notificationFrequencyService.existNotificationFrequency({ name })
    
    if (exist) {
      return response.status(STATUS_CODE_BAD_REQUEST).send({
        code: Number(STATUS_CODE_BAD_REQUEST),
        message: i18n.__('api.already-exist')
      })
    }

    const notificationFrequency = await notificationFrequencyService.createNotificationFrequency({ name, description })
    return response.send(notificationFrequency)
  }))
}

export default NotificationFrequencyController
