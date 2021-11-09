import { GoalService, RightThingService, UserService } from '../services'
import { userUpdateValidator } from '../validators'

const UserController = ({ router, auth, validator, tryCatch }) => {
  const goalService = GoalService()
  const userService = UserService()
  const rightThingService = RightThingService()
  const { COMPLETED_GOAL_STATUS_ID, EXPIRED_GOAL_STATUS_ID } = process.env

  router.put('/user', auth, userUpdateValidator, validator, tryCatch(async (request, response) => {
    const { authId } = request.user
    const { name } = request.body

    await userService.updateUser({ authId }, { $set: { name } })
    return response.send({ name })
  }))

  router.get('/user/stats', auth, tryCatch(async (request, response) => {
    const { authId } = request.user
    const rightThingStat = await rightThingService.countRightThing({})
    const goalCompletedStat = await goalService.countGoal({
      'goalStatus.id': COMPLETED_GOAL_STATUS_ID,
      'user.authId': authId
    })

    const goalPending = await goalService.countGoal({
      'goalStatus.id': EXPIRED_GOAL_STATUS_ID,
      'user.authId': authId
    })

    return response.send({
      rightThing: rightThingStat,
      goalCompleted: goalCompletedStat,
      goalPending
    })
  }))

  return router
}

export default UserController
