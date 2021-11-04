import { RightThingService } from '../services'
import { rightThingValidator } from '../validators'

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
}

export default RightThingController
