const app = require('./app')
app.enable('trust proxy')
const supertest = require('supertest')
const request = supertest(app)
//const {obtainOpenApi} = require("./controllers/controllers")

describe('testing routes with private ip', () => {
  it('Gets the open api documentation about the app', () => {
    jest.setTimeout(request.get('/v1').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.hasOwnProperty("openapi")).toBe(true)
    }),5000)
  })

  it('Gets the object with information about the location', () => {
    jest.setTimeout(request.get('/location').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.query).toBe("139.130.4.5")
    }),5000)
  })

  it('Gets the object with information about the location and today`s weather.', (done) => {
    jest.setTimeout(request.get('/current').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.city).toBe("Broome")
      expect(ob.hasOwnProperty("weather")).toBe(true)
      done()
    }),5000)
  })

  it('Gets the object with information about the location and today`s weather. City provided', (done) => {
    jest.setTimeout(request.get('/current?city=san miguel, buenos aires, argentina').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.city).toBe("San Miguel")
      expect(ob.hasOwnProperty("weather")).toBe(true)
      done()
    }),5000)
  })

  it('Gets the object with information about the location and forecast', (done) => {
    jest.setTimeout(request.get('/forecast').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.city).toBe("Broome")
      expect(ob.hasOwnProperty("forecast")).toBe(true)
      done()
    }),5000)
  })

  it('Gets the object with information about the location and forecast. City provided', (done) => {
    jest.setTimeout(request.get('/forecast?city=san miguel,buenos aires,argentina').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.city).toBe("San Miguel")
      expect(ob.hasOwnProperty("forecast")).toBe(true)
      done()
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

  it('Gets the object with information about the location', () => {
    jest.setTimeout(request.get('/location').set('X-Forwarded-For', '186.139.181.246').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.query).toBe("186.139.181.246")
    }),5000)
  })

  it('Gets the object with information about the location and today`s weather.', (done) => {
    jest.setTimeout(request.get('/current').set('X-Forwarded-For', '186.139.181.246').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.city).toBe("Broome")
      expect(ob.hasOwnProperty("weather")).toBe(true)
      done()
    }),5000)
  })

  it('Gets the object with information about the current location and today`s weather. City provided', (done) => {
    jest.setTimeout(request.get('/current?city=san miguel, buenos aires, argentina').set('X-Forwarded-For', '186.139.181.246').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.city).toBe("San Miguel")
      expect(ob.hasOwnProperty("weather")).toBe(true)
      done()
    }),5000)
  })

  it('Gets the object with information about the location and forecast', (done) => {
    jest.setTimeout(request.get('/forecast').set('X-Forwarded-For', '186.139.181.246').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.query).toBe("186.139.181.246")
      expect(ob.hasOwnProperty("forecast")).toBe(true)
      done()
    }),5000)
  })

  it('Gets the object with information about the location and forecast. City provided', (done) => {
    jest.setTimeout(request.get('/forecast?city=san miguel,buenos aires,argentina').set('X-Forwarded-For', '186.139.181.246').then(data => {
      const ob = JSON.parse(data.text)
      expect(ob.location.city).toBe("San Miguel")
      expect(ob.hasOwnProperty("forecast")).toBe(true)
      done()
    }),5000)
  })
})


module.exports = app;
