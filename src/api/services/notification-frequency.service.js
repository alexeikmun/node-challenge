import { NotificationFrequencyModel } from '../models'

const NotificationFrequencyService = () => {
  const createNotificationFrequency = async (notificationFrequency) => await NotificationFrequencyModel.create(notificationFrequency)
  const getNotificationFrequencies = async () => await NotificationFrequencyModel.find()
  const existNotificationFrequency = async (query) => await NotificationFrequencyModel.exists(query)

  return {
    createNotificationFrequency,
    getNotificationFrequencies,
    existNotificationFrequency
  }
}

export default NotificationFrequencyService
