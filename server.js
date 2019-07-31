const express = require('express')
const app = express() // define the app using express
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./config/database.conf')
const router = require('./routes/user')

mongoose.connect(dbConfig.url[app.settings.env], {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Successfully connected to the database')
}).catch(err => {
    console.log(`Could not connect to the database. Exiting now... ${err}`)
    process.exit()
})
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/api', router)

module.exports = app
