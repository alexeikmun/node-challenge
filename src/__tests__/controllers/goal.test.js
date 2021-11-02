require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../providers')
const { AuthService, GoalTypeService, NotificationFrequencyService } = require('../../api/services')
const api = require('../../api')
const { 
   user,
   goalType,
   notificationFrequency,
   goal,
   goalInvalid,
   goalInvalidCatalogue 
} = require('../../__mocks__')

const { response } = require('express')

describe('GOAL', () => {
  let app = {}
  let firebase = {}
  let token = {}
  let goalTypeData = {}
  let notificationFrequencyData = {}
  const authService = AuthService()
  const goalTypeService = GoalTypeService()
  const notificationFrequencyService = NotificationFrequencyService()

  beforeAll(async () => {
    dotenv.config()
    const mongoServer = await MongoMemoryServer.create()
    const database = mongoose.connect(mongoServer.getUri())
    const translatePath = path.join(__dirname, '../../locales')
    setupTranslate(translatePath, 'en')
    firebase = setupFirebase()
    
    app = api.default({ database, firebase })
    token = await request(app).post('/api/v1/user/sign-up').send(user)
    
    goalTypeData = await request(app).post('/api/v1/goal-type').auth(token.body.access_token, {
      type: 'bearer'
    }).send(goalType)
    
    notificationFrequencyData = await request(app).post('/api/v1/notification-frequency').auth(token.body.access_token, {
      type: 'bearer'
    }).send(notificationFrequency)

    console.log('------------------------------')
    console.log('notificationFrequencyData -->', notificationFrequencyData.body)
    console.log('goalTypeData -->', goalTypeData.body)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    await authService.deleteUserByEmail(firebase, user.email)
  })

  describe('POST: /goal', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).post('/api/v1/goal').send(goal)

        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should be response Bad Request', async () => {
        const response = await request(app).post('/api/v1/goal').auth(token.body.access_token, {
          type: 'bearer'
        }).send(goalInvalid)

        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('Invalid catalogue', () => {
      it ('should be response Bad Request', async () => {
        const response = await request(app).post('/api/v1/goal').auth(token.body.access_token, {
          type: 'bearer'
        }).send(goalInvalidCatalogue)

        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('Valid input', () => {
      it('should be response OK', async () => {
        goal.goalType = goalTypeData.body
        goal.notificationFrequency = notificationFrequencyData.body

        const response = await request(app).post('/api/v1/goal').auth(token.body.access_token, {
          type: 'bearer'
        }).send(goal)
        
        console.log('response -->', response.body)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })
  })
})