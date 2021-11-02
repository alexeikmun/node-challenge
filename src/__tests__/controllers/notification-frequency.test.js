require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../providers')
const { AuthService } = require('../../api/services')
const api = require('../../api')
const { user, notificationFrequency, notificationFrequencyInvalid } = require('../../__mocks__')
const { response } = require('express')

describe('Notification_Frequency', () => {
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

  describe('POST: /notification-frequency', () => {
    describe('Missing token', () => {
      it('Should be response unauthorized', async () => {
        const response = await request(app).post('/api/v1/notification-frequency').send(notificationFrequency)
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should be response bad request', async () => {
        const response = await request(app).post('/api/v1/notification-frequency').auth(token.body.access_token, { 
          type: 'bearer' 
        }).send(notificationFrequencyInvalid)
        
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('New NotificationFrequency', () => {
      it('Should be response Ok', async () => {
        const response = await request(app).post('/api/v1/notification-frequency').auth(token.body.access_token, {
          type: 'bearer'
        }).send(notificationFrequency)
  
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })

    describe('NotificationFrequency already exist', () => {
      it('Should be response bad request', async () => {
        const response = await request(app).post('/api/v1/notification-frequency').auth(token.body.access_token, {
          type: 'bearer'
        }).send(notificationFrequency)
        
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })
  })

  describe('GET: /notification-frequency', () => {
    describe('Missign token', () => {
      it('Should be response unauthorized', async () => {
        const response = await request(app).get('/api/v1/notification-frequency')

        expect(response.statusCode).toBe(401)
      })
    })

    describe('Valid input', () => {
      it('Should be response OK', async () => {
        const response = await request(app).get('/api/v1/notification-frequency').auth(token.body.access_token, {
          type: 'bearer'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })
  })
})