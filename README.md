Pre-request 
    MongoDB
    Node

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

    To Save the trip details in DB
    Endpoint:- http://localhost:3000/tripRouter/save
    Method: POST
    Payload: {
        "origin": "ATL",
        "destination": "OSL",
        "cost": 5936,
        "duration": 19,
        "type": "flight",
        "display_name": "from ATL to OSL by flight"
    }

    To get the trips saved in DB
    Endpoint:- http://localhost:3000/tripRouter/list
    Method: GET

    To Delete the trip based on _id
    Endpoint:- http://localhost:3000/tripRouter/deleteTrip?_id=""
    Method: GET

