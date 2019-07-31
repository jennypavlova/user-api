# User API Implementation
### Project overview
- #### Prerequisites to start the project locally
    - Node.js >= 8.10.0
    - MongoDB >= 3.2.21
    - NPM >= 
- #### API Endpoints
    - ``GET /api/users``
    - ``POST /api/users``
    - ``GET /api/users/:userId``
    - ``PUT /api/users/:userId``
    - ``DELETE /api/users/:userId``
- #### Testing
    ##### Unit tests
    - To run the unit test run 
    ``npm run test``
    ##### Postman collection
    ##### Local testing using curl (with example data)
     - GET : get all users ``curl http://localhost:8080/api/users``
     - POST : create a new user
     ``curl -d '{"email":"john@smith.com", "givenName": "John", "familyName": "Smith"}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/users ``
     - PUT : update existing user ( Copy the id from the response of the POST request and replace with the ``_ID_``) :
     ``curl -d '{"email":"john@smithUPDATE.com", "givenName": "JohnUPDATE", "familyName": "SmithUPDATE"}' -H "Content-Type: application/json" -X PUT http://localhost:8080/api/users/_ID_``
     - DELETE : Delete existing user ( Copy the id from the response of the POST request and replace with the ``_ID_``) :
     `` curl -X DELETE http://localhost:8080/api/users/_ID_ ``
### Project tools and libraries