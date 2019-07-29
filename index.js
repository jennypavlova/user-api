const express = require('express');
const app = express(); // define the app using express
const bodyParser = require('body-parser');
const createDummyUsers = require('./data/user');

const UserMap = new Map()
createDummyUsers(UserMap);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;


// ROUTES
const router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to user api!'
    });
});
router.get('/users', (req, res) =>{
    console.log('Before GET ')
    console.log(UserMap)
    const users = Array.from(UserMap.values());

    console.log(users)
    res.status(200).send(users)
})
router.get('/users/:userId', (req, res) => {
    const User = UserMap.get(req.params.userId)
    if (!User) {
        return res.status(404).send('User with id ' + req.params.userId + ' not found')
    } else {
        return res.status(200).send(JSON.stringify(User))
    }
});
router.post('/users', (req, res) => {
    if (!req.body.email) {
        return res.status(400).send('User Email is missing');
    }

    const User = {
        id: Math.random().toString(36).substr(2, 9),
        email: req.body.email,
        givenName: req.body.givenName,
        familyName: req.body.familyName,
        created: Date.now()
    }

    UserMap.set(User.id, User)
    console.log(UserMap)

    //return res.send('Received a POST HTTP method ', JSON.stringify(User))
    return res.status(200).send(User);
});
router.put('/users/:userId', (req, res) => {
    if (!req.body.email || !req.body.familyName || !req.body.givenName) {
        return res.status(400).send("Please validate your data");
    }
    let UsertoUpdate = UserMap.get(req.params.userId)
    if (!UsertoUpdate) {
        return res.status(400).send("User with id" + req.params.userId + " is not existing");
    }
    UsertoUpdate = {
        ...UsertoUpdate,
        id: req.params.userId,
        email: req.body.email,
        givenName: req.body.givenName,
        familyName: req.body.familyName,
    }
    UserMap.set(req.params.userId, UsertoUpdate)
    console.log(UserMap)
   res.status(200).send(UserMap.get(req.params.userId));
});
router.delete('/users/:userId', (req, res) => {
    const User = UserMap.get(req.params.userId)
    if (!User) {
        return res.status(404).send('User with id ' + req.params.userId + ' not found')
    } else {
        UserMap.delete(req.params.userId)
        console.log(UserMap)
        return res.status(200).send(
            `DELETE HTTP method on user/${req.params.userId} resource`,
        );
    }

});

app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Server is running on port ' + port);

module.exports = app