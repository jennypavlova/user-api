// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../server')
const User = require('../models/user')

chai.use(chaiHttp)
chai.should()
const _id = '5d4078355574df67b9467666'

describe('Test CRUD operations user', () => {
    // User.collection.drop()
    beforeEach((done) => {
        const newUser = new User({
            _id: _id,
            email: 'john@test.com',
            givenName: 'John',
            familyName: 'Smith'
        })
        newUser.save(err => {
            if (err) console.log(err)
            console.log('user created')
            done()
        })
    })
    afterEach(function (done) {
        User.collection.drop()
        done()
    })
    it('POST api/users sit should create new user', async () => {
        const res = await chai.request(server).post('/api/users')
            .set('content-type', 'application/json')
            .send({
                email: 'test123@test.com',
                givenName: 'Anna',
                familyName: 'Smith'
            })
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.include({
            email: 'test123@test.com',
            givenName: 'Anna',
            familyName: 'Smith'
        })
    })

    it('GET api/users : it should GET all the users', async () => {
        const res = await chai.request(server).get('/api/users')
        res.should.have.status(200)
        res.body.should.be.an('array')
        res.body.length.should.not.be.eql(0)
        res.body[0].should.be.an('object')
    })
    it('GET /api/users/:userId  it should get a single user', async () => {
        const res = await chai.request(server).get(`/api/users/${_id}`)
        res.should.have.status(200)
        res.body.should.be.an('object')
    })
    it('PUT api/users/:userId it should update existing user', async () => {
        const res = await chai.request(server).put(`/api/users/${_id}`)
            .send({
                email: 'john@test.com',
                givenName: 'Johnny',
                familyName: 'Junior'
            })
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.include({
            email: 'john@test.com',
            givenName: 'Johnny',
            familyName: 'Junior'
        })
    })

    it('DELETE api/users/:userId : it should delete existing user', async () => {
        const res = await chai.request(server).delete(`/api/users/${_id}`)
        res.should.have.status(200)
    })
})
