const {app, server} = require('../index')
const request = require('supertest')
const {expect} = require('chai')
const {MongoClient} = require('mongodb')

const dbUri = process.env.DB_URI;

describe('GET /users', () => {
 before(async () => {
    const client = await MongoClient.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('myDb');
    usersCollection = db.collection('users');
    await usersCollection.insertMany([
      { name: 'User1', email: 'user1@example.com' },
      { name: 'User2', email: 'user2@example.com' }
    ]);
  });

  after(async () => {
    await usersCollection.deleteMany({});
    await server.close();
  });

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

