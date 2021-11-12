require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../../src/providers')
const { AuthService } = require('../../../src/api/services')
const api = require('../../../src/api')

const { 
   user
} = require('../../__mocks__')

const { response } = require('express')

describe('USER', () => {
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

  describe('GET: /user/stats', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).get('/api/v1/user/stats')
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Valid input', () => {
      it('Should be response OK', async() => {
        const response = await request(app).get('/api/v1/user/stats').auth(token.body.access_token, {
          type: 'bearer'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.rightThing).toBe(0)
        expect(response.body.goalCompleted).toBe(0)
        expect(response.body.goalPending).toBe(0)
      })
    })
  })

  describe('PUT: /user', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).put('/api/v1/user').send({
          name: 'New name'
        })

        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid input', () => {
      it('Should be response Bad request', async () => {
        const response = await request(app).put('/api/v1/user').auth(token.body.access_token, {
          type: 'bearer'
        }).send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('Valid input', () => {
      it ('Should be response OK', async () => {
        const response = await request(app).put('/api/v1/user').auth(token.body.access_token, {
          type: 'bearer'
        }).send({name: 'New name'})

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.name).toBeDefined()
      })
    })
  })

  describe('POST: /user/image', () => {
    const pathImage = path.resolve(__dirname, '../../__mocks__/image.jpeg')
    console.log(pathImage)
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).post('/api/v1/user/image')
        expect(response.statusCode).toBe(401)
      })

    })

    describe('Invalid input', () => {
      it('Should be response bad request', async () => {
        const response = await request(app).post('/api/v1/user/image').auth(token.body.access_token, {
          type: 'bearer'
        }).attach('images', pathImage)
  
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })

    describe('Valid input', () => {
      it('Should bre response OK', async () => {
        const response = await request(app).post('/api/v1/user/image').auth(token.body.access_token, {
          type: 'bearer'
        }).attach('image', pathImage)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.created).toBeTruthy()
      })
    })
  })
})