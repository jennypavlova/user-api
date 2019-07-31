const express = require('express')
const router = express.Router()

const User = require('../models/user')

const httpError = (httpStatusCode, message) => {
    const error = new Error(message)
    error.httpStatusCode = httpStatusCode
    return error
}

// METHODS
const asyncWrapper = endpoint => (req, res) =>
    endpoint(req, res)
        .then(() => {
            console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`)
        })
        .catch(err => {
            console.error(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} ERROR ${err}`)
            if (err.httpStatusCode && err.message) {
                return res.status(err.httpStatusCode).send(err.message)
            }
            return res.status(500).send(`Somethig went wrong: ${err}`)
        })

const getUserById = async (userId, req, res) => {
    const user = await User.findById(userId).exec()
    if (!user) {
        throw httpError(404, `User with id ${req.params.userId} not found`)
    }
    return user
}

// ROUTES
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', asyncWrapper(async (req, res) => {
    res.json({
        message: 'Welcome to user api!'
    })
}))
router.get('/users', asyncWrapper(async (req, res) => {
    const user = await User.find().exec()
    res.send(user)
}))

router.get('/users/:userId', asyncWrapper(async (req, res) => {
    const user = await getUserById(req.params.userId, req, res)
    res.send(user)
}))
router.post('/users', asyncWrapper(async (req, res) => {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.send(savedUser)
}))
router.put('/users/:userId', asyncWrapper(async (req, res) => {
    const user = await getUserById(req.params.userId, req, res)
    if (!req.body.email || !req.body.givenName || !req.body.familyName) {
        throw httpError(400, 'Missing user information')
    }
    if (req.body.createdAt) {
        throw httpError(400, 'Created date can not be modified!')
    }
    user.set(req.body)
    const savedUser = await user.save()
    res.send(savedUser)
}))
router.delete('/users/:userId', asyncWrapper(async (req, res) => {
    await getUserById(req.params.userId, req, res)
    const user = await User.deleteOne({
        _id: req.params.userId
    }).exec()
    res.send(user)
}))

module.exports = router
