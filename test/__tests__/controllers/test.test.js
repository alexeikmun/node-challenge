require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { setupTranslate } = require('../../../src/providers')
const api = require('../../../src/api')
const app = api.default({})

beforeAll(done => {
  dotenv.config()
  const translatePath = path.join(__dirname, '../../locales')
  setupTranslate(translatePath, 'en')
  done()
})

describe('GET: /test', () => {
  describe('send empty params', () => {
    it('should be response status code 200', async () => {
      const response = await request(app).get('/api/v1/test')
      expect(response.statusCode).toBe(200)
    })

    it('should be a response body', async () => {
      const response = await request(app).get('/api/v1/test')

      expect(response.body.gretting).toBeDefined()
    })
  })
})
