require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const luxon = require('luxon')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../../src/providers')
const { AuthService } = require('../../../src/api/services')
const api = require('../../../src/api')

const { 
   user,
   rightThing
} = require('../../__mocks__')
const { response } = require('express')


describe('RIGHT-THINGS', () => {
  let app = {}
  let firebase = {}
  let token = {}
  let rightThingId = ''
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

  describe('POST: /right-thing', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).post('/api/v1/right-thing').send(rightThing)
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should be response Bad Request', async () => {
        const response = await request(app).post('/api/v1/right-thing').auth(token.body.access_token, {
          type: 'bearer'
        }).send()
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('Valid input', () => {
      it('Should be response OK', async () => {
        const response = await request(app).post('/api/v1/right-thing').auth(token.body.access_token, {
          type: 'bearer'
        }).send(rightThing)

        rightThingId = response.body._id

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body._id).toBeDefined()
      })
    })
  })

  describe('GET: /right-thing/today', () => {
    const timeZone = luxon.DateTime.now().zone.name

    describe('Missing token', () => {
      it('Should be response Unautorized', async () => {
        const response = await request(app).get(`/api/v1/right-thing/today?timeZone=${timeZone}`)
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should be response Bad Request', async () => {
        const response = await request(app).get(`/api/v1/right-thing/today`).auth(token.body.access_token, {
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
        const response = await request(app).get(`/api/v1/right-thing/today?timeZone=${timeZone}`).auth(token.body.access_token, {
          type: 'bearer'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.created).toBeTruthy()
      })
    })
  })

  describe('DELETE: /right-thing/:id', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).delete(`/api/v1/right-thing/${rightThingId}`)
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should bre response Bad request', async () => {
        const response = await request(app).delete(`/api/v1/right-thing/${rightThingId}a`).auth(token.body.access_token, {
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
        const response = await request(app).delete(`/api/v1/right-thing/${rightThingId}`).auth(token.body.access_token, {
          type: 'bearer'
        })
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.deletedCount).toBeDefined()
      })
    })
  })
})