require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../../src/providers')
const { AuthService } = require('../../../src/api/services')
const api = require('../../../src/api')
const { user, goalType, goalTypeInvalid } = require('../../__mocks__')

describe('GOAL_TYPE', () => {
  let app = {}
  let firebase = {}
  let token = {}
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
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    await authService.deleteUserByEmail(firebase, user.email)
  })

  describe('POST: /goal-type', () => {
    describe('Missign token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).post('/api/v1/goal-type').send(goalType)
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should be response bad request', async () => {
        const response = await request(app).post('/api/v1/goal-type').auth(token.body.access_token, {
          type: 'bearer'
        }).send(goalTypeInvalid)

        expect(response.statusCode).toBe(400)
      })
    })

    describe('New goalType', () => {
      it('Should be response OK', async () => {
        const response = await request(app).post('/api/v1/goal-type').auth(token.body.access_token, {
          type: 'bearer'
        }).send(goalType)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })

    describe('GoalType already exist', () => {
      it('Should be response response bad request', async () => {
        const response = await request(app).post('/api/v1/goal-type').auth(token.body.access_token, {
          type: 'bearer'
        }).send(goalType)
        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })
  })

  describe('GET: /goal-type', () => {
    describe('Missing token', () => {
      it ('should be response Unauthorized', async () => {
        const response = await request(app).get('/api/v1/goal-type')
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Valid request', () => {
      it ('should be response OK', async () => {
        const response = await request(app).get('/api/v1/goal-type').auth(token.body.access_token, {type: 'bearer'})
        expect(response.statusCode).toBe(200)
      })
    })
  })
})