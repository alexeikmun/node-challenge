import { NotificationFrequencyModel } from '../models'

const NotificationFrequencyService = () => {
  const createNotificationFrequency = async (notificationFrequency) => await NotificationFrequencyModel.create(notificationFrequency)
  const getNotificationFrequencyById = async (id) => await NotificationFrequencyModel.findById(id)
  const getNotificationFrequencies = async () => await NotificationFrequencyModel.find()
  const existNotificationFrequency = async (query) => await NotificationFrequencyModel.exists(query)

  return {
    createNotificationFrequency,
    getNotificationFrequencyById,
    getNotificationFrequencies,
    existNotificationFrequency
  }
}

export default NotificationFrequencyService
