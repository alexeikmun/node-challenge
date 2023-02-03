# node-test #
 **Node test is a the API for unosquare NodeJS candidate evaluations**.


## -- How to use -- ##

    You want to download the project to review the code, please do it and follow the next steps:

    1. git clone {REPO}
    2. cd node-test
    3. npm i
    4. npm start

    Do you want to execute some test?, please do it:
    
    1. npm test or npm run test:watch if you want to execute some changes

    Dou youn want to debug the code to resolve some problems ? do it on chrome console:

    1. npm run debug
    2. open on chrome chrome://inspect/#devices
    3. click en remote targets for the app

    How to ignore a debugger:

    * //eslint-disable-line

    Prepare to deploy:

    * npm run build


## -- About the test -- ##

    create two endpoints for userController [./src/api/controllers/user.controller.js] you will find and example for get that you can
    use in the browser or any http client (GET: http://localhost:4000/api/v1/user).

    1. GET: a user by id
    2. POST: create a new user.
    3. TEST: You can create a test suite for one of this new endpoints in the folder ./test/__tests__/


## -- About the project -- ## 

    ### Technologies ###

    In this API we are using diferents technologies focus in solve different problems
    when we create an API, this is with demostrative purpose, to show my experience
    working with Node.js

    - Express:
      We are using express to create endpoints in the application, for example: GET, DELETE or Post,
      to do that, we use the Router's express this allow me to assign endpoints to the API. additional
      to the routes we only use express to create the API application and delegates the exposition of
      the server to the native module http, this is to avoid incompatibility to future integrations like
      token and also to the unit test.

    - Slint + StandarJS:
      To define and maintanance the way or the style of the code, we´re using these technologies, to correct some
      spaces and basic techniques when we´re coding. This is a good way to work in a colaborative project.

    - express-validator:
      We use it to apply validation and sanitization to entry data, this is a way to protect the endpoint of bad 
      or malicious requests. 

    - Jest + supertest :
      Finally we have Jest these combination of technologies to apply unit testing to all the 
      endpoints of the application and ensure the quality of the code.

  ### Architecture and Structure ###

  #### Architecture ####

    We are using a very comon MVC architecture with all the information flows in one way, this can be a good idea
    for APIs, but maybe can be short for web application when the interaction of the users it´s very high.

  #### Structure ####
    - Routes:
      It´s the intermediate between all the controllers and the express app, the routes define with controllers
      can be expose and initialize all of them.

    - Controllers:
      It´s the master mind of the application, they controlls the logic and flow of every endpoint. They
      can call or access to services, validator and utils if it´s necesary to accomplish a goal.

    - Database:
      A folder with a dummy database for test use.

      
    Thank you for reading!
