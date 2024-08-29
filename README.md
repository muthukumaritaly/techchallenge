App is created by running the default express skeleton command
    npm install express-generator -g

Added packages for developing
    nodemon

Testing packages used
    mocha
    chai
    supertest

To run the project by fallowing the below commands

    yarn install || npm install

    yarn start || npm start

To run test cases
    yarn test || npm test
    
Postman Details
    Endpoint:- http://localhost:3000/efficientRouteFinder
    Method: POST
    Payload: {
        "origin": "PEK",
        "destination": "JFK",
        "sort_by": "cheapest"
    }