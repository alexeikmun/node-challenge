require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const api = require('../../../src/api')

const {
  test,
} = require('../../__mocks__')
const { response } = require('express')


describe('User test', () => {
  let app = {}

  beforeAll(async () => {
    dotenv.config()
    app = api.default()
  })

  describe('GET: /user', () => {
    describe('Valid request --->', () => {
      it('Should be response OK', async () => {
        const response = await request(app).get(`/api/v1/user`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(Array.isArray(response.body))
        const user = response.body[0]
        expect(typeof user).toBe('object')
        expect(user.id).toBeDefined()
      })
    })
  })

  describe('POST: /user', () => {
    describe('Valid request --->', () => {
      it('Something', async () => {
        expect(1 === 1)
      })
    })
  })
})