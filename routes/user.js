
// ROUTES
const User = require('../models/user')
const express = require('express')
const router = express.Router()

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (err) {
            return res.status(500).send(` Somethig went wrong : ${err}`)
        }
        next(err)
    })
}

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to user api!'
    })
})
router.get('/users', async (req, res) => {
    try {
        const user = await User.find().exec()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})
const getUserById = async (userId, req, res) => {
    const user = await User.findById(userId).exec()
    console.log(user)
    if (!user) {
        return res.status(404).send(`User with id ${req.params.userId} not found`)
    }
    return user
}

router.get('/users/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId, req, res)
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post('/users', asyncMiddleware(async (req, res) => {
    try {
        const user = new User(req.body)
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(500).send(error)
    }
}))
router.put('/users/:userId', asyncMiddleware(async (req, res) => {
    const user = await getUserById(req.params.userId, req, res)
    if (!req.body.email || !req.body.givenName || !req.body.familyName) {
        return res.status(400).send('Missing user information')
    }
    if (req.body.createdAt) {
        return res.status(400).send('Created date can not be updated!')
    }
    user.set(req.body)
    const savedUser = await user.save()
    res.send(savedUser)
}))
router.delete('/users/:userId', asyncMiddleware(async (req, res) => {
    await getUserById(req.params.userId, req, res)
    const user = await User.deleteOne({
        _id: req.params.userId
    }).exec()
    res.send(user)
}))

module.exports = router
