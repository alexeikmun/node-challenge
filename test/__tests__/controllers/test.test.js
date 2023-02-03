require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const api = require('../../../src/api')

const {
  test,
} = require('../../__mocks__')
const { response } = require('express')


describe('Dummy test', () => {
  let app = {}

  beforeAll(async () => {
    dotenv.config()
    app = api.default()
  })
  
  describe('GET: /test', () => {
    describe('Valid request --->', () => {
      it('Should be response OK', async () => {
        const response = await request(app).get(`/api/v1/test`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.gretting).toBe('Hi developer, May the force be with you')
      })
    })
  })
})