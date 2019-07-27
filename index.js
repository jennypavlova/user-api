const express = require('express');
const app = express(); // define the app using express
const bodyParser = require('body-parser');


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
    return res.send('Received a GET HTTP method');
})
router.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});
router.post('/users', (req, res) => {
    return res.send('Received a POST HTTP method');
});
router.put('/users/:userId', (req, res) => {
    return res.send(
        `PUT HTTP method on user/${req.params.userId} resource`,
    );
});
router.delete('/users/:userId', (req, res) => {
    return res.send(
        `DELETE HTTP method on user/${req.params.userId} resource`,
    );
});


app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Server is running on port ' + port);