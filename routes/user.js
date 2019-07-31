const express = require('express')
const router = express.Router()

const User = require('../models/user')

// METHODS
const errorHandlingWraper = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (err) {
            return res.status(500).send(` Somethig went wrong : ${err}`)
        }
        next(err)
    })
}

const getUserById = async (userId, req, res) => {
    const user = await User.findById(userId).exec()
    if (!user) {
        return res.status(404).send(`User with id ${req.params.userId} not found`)
    }
    return user
}

// ROUTES
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', errorHandlingWraper(async (req, res) => {
    res.json({
        message: 'Welcome to user api!'
    })
}))
router.get('/users', errorHandlingWraper(async (req, res) => {
    const user = await User.find().exec()
    res.send(user)
}))

router.get('/users/:userId', errorHandlingWraper(async (req, res) => {
    const user = await getUserById(req.params.userId, req, res)
    res.send(user)
}))
router.post('/users', errorHandlingWraper(async (req, res) => {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.send(savedUser)
}))
router.put('/users/:userId', errorHandlingWraper(async (req, res) => {
    const user = await getUserById(req.params.userId, req, res)
    if (!req.body.email || !req.body.givenName || !req.body.familyName) {
        return res.status(400).send('Missing user information')
    }
    if (req.body.createdAt) {
        return res.status(400).send('Created date can not be modified!')
    }
    user.set(req.body)
    const savedUser = await user.save()
    res.send(savedUser)
}))
router.delete('/users/:userId', errorHandlingWraper(async (req, res) => {
    await getUserById(req.params.userId, req, res)
    const user = await User.deleteOne({
        _id: req.params.userId
    }).exec()
    res.send(user)
}))

module.exports = router
