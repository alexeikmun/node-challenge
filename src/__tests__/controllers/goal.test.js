require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../providers')
const { AuthService } = require('../../api/services')
const api = require('../../api')
const { 
   user,
   goalType,
   notificationFrequency,
   goalStatus,
   goal,
   goalInvalid,
   goalInvalidCatalogue 
} = require('../../__mocks__')


describe('GOAL', () => {
  let app = {}
  let firebase = {}
  let token = {}
  let goalTypeData = {}
  let notificationFrequencyData = {}
  let goalStatusData = {}
  let goalId = ''
  const authService = AuthService()

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

    goalStatusData = await request(app).post('/api/v1/goal-status').auth(token.body.access_token, {
      type: 'bearer'
    }).send(goalStatus)
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

        goalId = response.body._id

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })
  })

  describe('GET: /goal', () => {
    describe('Missing token', () => {
      it('Should be response Unautorized', async () => {
        const response = await request(app).get('/api/v1/goal')
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Valid input', () => {
      it('Should be response OK', async () => {
        const response = await request(app).get('/api/v1/goal').auth(token.body.access_token, {
          type: 'bearer'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })
  })

  describe('PUT: /goal/status/:id', () => {
    describe('Missign token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).put(`/api/v1/goal/status/${goalId}`).send(goalStatusData.body)
        expect(response.statusCode).toBe(401)
      })
    })
    
    describe('Invalid input', () => {
      it('Should be response Bad Request', async () => {
        const response = await request(app).put(`/api/v1/goal/status/${goalId}`).auth(token.body.access_token, {
          type: 'bearer'
        }).send()
        expect(response.statusCode).toBe(400)
      })
    })

    describe('Invalid goal and goalStatus', () => {
      it('Should be response Bad Request', async () => {
        const response = await request(app).put(`/api/v1/goal/status/617f7df63f4770bc77b604ca`).auth(token.body.access_token, {
          type: 'bearer'
        }).send({
          goalStatus: {
            id: '617f7df63f4770bc77b604cd'
          }
        })

        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('Valid input', () => {
      it('Should be response OK', async () => {
        const response = await request(app).put(`/api/v1/goal/status/${goalId}`).auth(token.body.access_token, {
          type: 'bearer'
        }).send({
          goalStatus: goalStatusData.body
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })
  })

  describe('GET: /goal/:id', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).get(`/api/v1/goal/${goalId}`)
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should be response Bad Request', async () => {
        const response = await request(app).get(`/api/v1/goal/${goalId}a`).auth(token.body.access_token, {
          type: 'bearer'
        })

        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('Valid input', () => {
      it('Should be response OK', async () => {
        const response = await request(app).get(`/api/v1/goal/${goalId}`).auth(token.body.access_token, {
          type: 'bearer'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body._id).toBeDefined()
      })
    })
  })
})