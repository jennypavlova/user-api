const express = require('express')
const app = express() // define the app using express
const bodyParser = require('body-parser')
const createDummyUsers = require('./data/user')
const mongoose = require('mongoose')
const dbConfig = require('./config/database.conf.js')
const User = require('./models/user.js')

mongoose.connect(dbConfig.url[app.settings.env], {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Successfully connected to the database')
}).catch(err => {
    console.log(`Could not connect to the database. Exiting now... ${err}`)
    process.exit()
})

const UserMap = new Map()
createDummyUsers(UserMap)

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080

// ROUTES
const router = express.Router() // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to user api!'
    })
})
router.get('/users', async (req, res) => {
    try {
        const result = await User.find().exec()
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/users/:userId', async (req, res) => {
    try {
        const result = await User.findById(req.params.userId).exec()
        if (!result) {
            return res.status(404).send(`User with id ${req.params.userId} not found`)
        }
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        const result = await user.save()
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.put('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).exec()
        user.set(req.body)
        var result = await user.save()
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.delete('/users/:userId', async (req, res) => {
    try {
        var result = await User.deleteOne({
            _id: req.params.userId
        }).exec()
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.use('/api', router)

// START THE SERVER
app.listen(port)
console.log(`Server is running on port ${port}`)

module.exports = app
