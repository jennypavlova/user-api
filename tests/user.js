// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.use(chaiHttp)
chai.should()
/*
* Test the /GET route
*/
describe('/GET user', () => {
    it('passes with status 200', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(200)
                done()
            })
    })
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.body.should.be.a('array')
                res.body.length.should.not.be.eql(0)
                res.body[0].should.be.an('object')
                done()
            })
    })
})
describe('/GET user with id', () => {
    it('it should not get a not existing user and returns status 404', function (done) {
        chai.request(server)
            .get('/api/users/1')
            .end((err, res) => {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(404)
                done()
            })
    })
    it('it should get a single user', function (done) {
        chai.request(server)
            .get('/api/users/id1')
            .end((err, res) => {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
            })
    })
})

describe('/POST users', () => {
    it('it should create new user', function (done) {
        chai.request(server)
            .post('/api/users')
            .send({
                email: 'test@test.com',
                givenName: 'Anna',
                familyName: 'Smith'
            })
            .end(function (err, res) {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
            })
    })
})
describe('/PUT users', () => {
    it('it should update existing user', function (done) {
        chai.request(server)
            .put('/api/users/id1')
            .send({
                email: 'test1234@test.com',
                givenName: 'Anna',
                familyName: 'Smith'
            })
            .end(function (err, res) {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.should.include({
                    email: 'test1234@test.com'
                })
                done()
            })
    })
    it('it should not update existing user with missing data in the request', function (done) {
        chai.request(server)
            .put('/api/users/id1')
            .send({
                email: 'test1234@test.com',
                familyName: 'Smith'
            })
            .end(function (err, res) {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(400)
                done()
            })
    })
})
describe('/DELETE user by id', () => {
    it('it should delete existing user', function (done) {
        chai.request(server)
            .delete('/api/users/id1')
            .end(function (err, res) {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(200)
                done()
            })
    })
    it('it should not delete not existing user and returns 404', function (done) {
        chai.request(server)
            .delete('/api/users/id5')
            .end(function (err, res) {
                if (err) {
                    console.log('Error status: ', err.status)
                }
                res.should.have.status(404)
                done()
            })
    })
})
