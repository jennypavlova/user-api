const app = require('./server')
const port = process.env.PORT || 8080
// START THE SERVER
app.listen(port)
console.log(`Server is running on port ${port}`)
