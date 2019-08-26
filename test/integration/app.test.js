import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'

dotenv.config()
let expect = chai.expect
chai.use(chaiHttp)
const randomString = () => Math.random().toString(36).substring(7)
let location = {}
let wrongInput = { name: '', female: 345, region: 'Nigeria' }
let correctLocation = { name: randomString(), male: 123, female: 345, region: randomString() }

describe('POST /location', () => {
  it('should return 400 for wrong input', async () => {
    let response = await chai.request(server).post('/api/v1/location').send(wrongInput)
    expect(response).to.have.status(400)
    expect(response.body.message).to.be.a('array')
  })
})
describe('POST /location', () => {
  it('should return 201', async () => {
    let response = await chai.request(server).post('/api/v1/location').send(correctLocation)
    expect(response).to.have.status(201)
    expect(response.body.data).to.be.a('object')
    // expect(response.body.success).to.equal(true)
    expect(response.body.data).to.be.a('object').that.includes.keys('name', 'male', 'female', 'total')
    location.entry1 = response.body.data
  })
})

describe('GET/location', () => {
  it('should return 200', async () => {
    let response = await chai.request(server).get(`/api/v1/location/${location.entry1._id}`).send()
    expect(response).to.have.status(200)
    expect(response.body.data).to.be.a('object')
    expect(response.body.success).to.equal(true)
  })
})

describe('PUT/location', () => {
  it('should return 200', async () => {
    let response = await chai.request(server).put(`/api/v1/location/${location.entry1._id}`).send({ male: 10, female: 20 })
    expect(response).to.have.status(200)

    expect(response.body.data).to.be.a('object')
    expect(response.body.success).to.equal(true)
  })
})

describe('DELETE/location', () => {
  it('should return 400', async () => {
    let response = await chai.request(server).delete(`/api/v1/location/${location.entry1._id}`).send()
    expect(response.body.success).to.equal(true)
  })
})
