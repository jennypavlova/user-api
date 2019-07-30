// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const User = require('../models/user')

chai.use(chaiHttp)
chai.should()
/*
* Test the /GET route
*/
describe('Test CRUD operations user', () => {
    // User.collection.drop()
    beforeEach(done => {
        var newUser = new User({
            _id: '5d4078355574df67b9467666',
            email: 'john@test.com',
            givenName: 'John',
            familyName: 'Smith'
        })
        newUser.save(err => {
            if (err) console.log(err)
            done()
        })
    })
    afterEach(function (done) {
        User.collection.drop()
        done()
    })
    it('GET api/users : passes with status 200', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                if (err) {
                    console.log(`Error status:${err.status}`)
                }
                res.should.have.status(200)
                done()
            })
    })
    it('GET api/users : it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                if (err) {
                    console.log(`Error status:${err.status}`)
                }
                res.body.should.be.a('array')
                res.body.length.should.not.be.eql(0)
                res.body[0].should.be.an('object')
                done()
            })
    })

    it('GET api/users : it should not get a not existing user and returns status 404', (done) => {
        chai.request(server)
            .get('/api/users/5d4078355574df67b9467636')
            .end((err, res) => {
                if (err) {
                    console.log(`Error status:${err.status}`)
                }
                res.should.have.status(404)
                done()
            })
    })
    it('GET api/users/userID : it should get a single user', (done) => {
        chai.request(server)
            .get('/api/users/5d4078355574df67b9467666')
            .end((err, res) => {
                if (err) {
                    console.log(`Error status:${err.status}`)
                }
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
            })
    })

    it('POST api/users sit should create new user', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
                email: 'test123@test.com',
                givenName: 'Anna',
                familyName: 'Smith'
            })
            .end((err, res) => {
                if (err) {
                    console.log(`Error status:${err.status}`)
                }
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
            })
    })

    it('PUT api/users/:userId it should update existing user', (done) => {
        chai.request(server)
            .put('/api/users/5d4078355574df67b9467666')
            .send({
                email: 'test2@test.com',
                givenName: 'John',
                familyName: 'Smith'
            })
            .end((err, res) => {
                if (err) {
                    console.log(`Error status:${err.status}`)
                }
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.should.include({
                    email: 'test2@test.com'
                })
                done()
            })
    })

    it('DELETE api/users/:userId : it should delete existing user', (done) => {
        chai.request(server)
            .delete('/api/users/5d4078355574df67b9467666')
            .end((err, res) => {
                if (err) {
                    console.log(`Error status:${err.status}`)
                }
                res.should.have.status(200)
                done()
            })
    })
})
