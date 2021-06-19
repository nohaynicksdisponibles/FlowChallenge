const app = require('./app')
app.enable('trust proxy')
const supertest = require('supertest')
const request = supertest(app)
//const {obtainOpenApi} = require("./controllers/controllers")

describe('testing routes', () => {
  it('Gets the open api documentation about the app', () => {
    jest.setTimeout(request.get('/v1').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.hasOwnProperty("openapi")).toBe(true)
    }),5000)
  })

  it('Gets the an object with information about the location', () => {
    jest.setTimeout(request.get('/location').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.query).toBe("139.130.4.5")
    }),5000)
  })
})

describe('testing routes with mocked ip', () => {

  it('Gets the open api documentation about the app', () => {
    jest.setTimeout(request.get('/v1').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.hasOwnProperty("openapi")).toBe(true)
    }),5000)
  })

  it('Gets the an object with information about the location', () => {
    jest.setTimeout(request.get('/location').set('X-Forwarded-For', '186.139.181.246').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.query).toBe("186.139.181.246")
    }),5000)
  })
})


module.exports = app;
