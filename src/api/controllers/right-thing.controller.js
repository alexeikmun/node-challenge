import { DateTime } from 'luxon'
import { RightThingService } from '../services'
import { rightThingValidator, timeZoneValidator, idValidator } from '../validators'

const RightThingController = ({ router, auth, validator, tryCatch }) => {
  const rightThingService = RightThingService()

  router.post('/right-thing', auth, rightThingValidator, validator, tryCatch(async (request, response) => {
    const { authId, email } = request.user
    const { description } = request.body

    const rightThing = await rightThingService.createRightThing({
      authId,
      email,
      description
    })

    return response.send(rightThing)
  }))

  router.delete('/right-thing/:id', auth, idValidator, validator, tryCatch(async (request, response) => {
    const { authId } = request.user
    const { id } = request.params

    const rightThing = await rightThingService.deleteRightThing({
      _id: id,
      'user.authId': authId
    })

    return response.send(rightThing)
  }))

  router.get('/right-thing/today', auth, timeZoneValidator, validator, tryCatch(async (request, response) => {
    const { timeZone } = request.query
    const date = DateTime.now().setZone(timeZone)
    const startDate = date.startOf('day')
    const endDate = date.endOf('day')

    const rightThing = await rightThingService.getRightThing({
      createdDate: {
        $gte: startDate,
        $lt: endDate
      }
    })

    return rightThing ? response.send({ created: true }) : response.send({ created: false })
  }))
}

export default RightThingController
