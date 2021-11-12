import { GoalService, RightThingService, UserService } from '../services'
import { userUpdateValidator } from '../validators'
import i18n from 'i18n'

const UserController = ({ router, auth, validator, tryCatch, firebase }) => {
  const goalService = GoalService()
  const userService = UserService()
  const rightThingService = RightThingService()
  const { COMPLETED_GOAL_STATUS_ID, EXPIRED_GOAL_STATUS_ID, STATUS_CODE_BAD_REQUEST } = process.env

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

  router.post('/user/image', auth, tryCatch(async (request, response) => {
    const { authId } = request.user

    if (request.files && request.files.image) {
      const { image } = request.files
      const bucket = firebase.storage().bucket()
      const [files] = await bucket.getFiles({ prefix: `images/${authId}/` })
      console.log('files -->', files)
      files.forEach(async (file) => await file.delete())

      const blob = bucket.file(`images/${authId}/${image.name}`)
      const blobWriter = blob.createWriteStream({ metadata: { contentType: image.mimetype } })
      blobWriter.on('error', () => response.send({ created: false }))
      blobWriter.on('finish', async () => response.send({ created: true }))
      blobWriter.end(image.data)
    } else {
      response.status(STATUS_CODE_BAD_REQUEST).send({
        code: Number(STATUS_CODE_BAD_REQUEST),
        message: i18n.__('api.user-controller.invalid-image')
      })
    }
  }))

  router.get('/user/image', auth, tryCatch(async (request, response) => {
    const { authId } = request.user

    const bucket = firebase.storage().bucket()
    const [files] = await bucket.getFiles({ prefix: `images/${authId}/` })

    const file = await files[0].download()
    const base64 = file[0].toString('base64')
    return response.send({ image: `data:${files[0].metadata.contentType};base64,${base64}` })
  }))

  return router
}

export default UserController
