const app = require('../index')
const request = require('supertest')
const {expect} = require('chai')

describe('GET /users', () => {
  it('should return all users',(done)=> {
    request(app)
    .get('/users')
    .expect(200)
    .end((err, res)=> {
        if (err) return done(err)
        expect(res.body).to.be.an('array')
        done();
      })
  })
})

