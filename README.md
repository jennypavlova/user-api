# User API Implementation
### Project overview
- #### Local setup
    - Prerequisites to start the project locally
        - Node.js >= 8.10.0
        - MongoDB >= 3.2.21
        - NPM >= 3.5.2
    - Run the project
        - ``npm run dev``
            - _Note_: The port could be defined in environmental variable (_process.env.PORT_)
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
    - inport the files from [test/postman](https://github.com/jennypavlova/user-api/tree/master/tests/postman) folder in postman app and execute them in the current order. After the POST request the user id will be populated in the next test to siplify the testing. (Of course you can set the date manually)
    - _Note_ the **{{url}}** and **{{id}}** can be changed in the DEV enironment variable
    ##### Local testing using curl (with example data)
     - GET : get all users ``curl http://localhost:8080/api/users``
     - POST : create a new user
     ``curl -d '{"email":"john@smith.com", "givenName": "John", "familyName": "Smith"}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/users ``
     - PUT : update existing user ( Copy the id from the response of the POST request and replace with the ``_ID_``) :
     ``curl -d '{"email":"john@smithUPDATE.com", "givenName": "JohnUPDATE", "familyName": "SmithUPDATE"}' -H "Content-Type: application/json" -X PUT http://localhost:8080/api/users/_ID_``
     - DELETE : Delete existing user ( Copy the id from the response of the POST request and replace with the ``_ID_``) :
     `` curl -X DELETE http://localhost:8080/api/users/_ID_ ``