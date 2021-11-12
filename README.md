# YOUCAN-API #
YouCanAPI is a the API for the mobile application to archive your goals to stay motivated to accomplish it.


## -- How to use -- ##
#### You want to download the project to review the code, please do it and follow the next steps: ####

1. git clone https://github.com/leonelcontreras/youcan-api.git
2. cd youcan-api
3. npm i
4. npm start

#### Do you want to execute some test?, please do it ####
1. npm test or npm run test:watch if you want to execute some changes

#### Dou youn want to debug the code to resolve some problems ? do it on chrome console ####

1. npm run debug
2. open on chrome chrome://inspect/#devices
3. click en remote targets for the app

#### How to ignore a debugger ####

* //eslint-disable-line

#### Prepare to deploy ####

* npm run build


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

    - mongoose:
      Mongoose is an object modeler to MongoDB, and we use it to connect and interact with the database, and also
      define the structure of the collections.

    - Slint + StandarJS:
      To define and maintanance the way or the style of the code, we´re using these technologies, to correct some
      spaces and basic techniques when we´re coding. This is a good way to work in a colaborative project.

    - express-validator:
      We use it to apply validation and sanitization to entry data, this is a way to protect the endpoint of bad 
      or malicious requests.

    - Firebase:
      We are using two elements of firebase-admin, in one hand we have firebase Authentication, to validate identity
      with tokens based it in oauth. In the other hand we have firebase storage to save files like image profile.  

    - Jest + supertest :
      Finally we have Jest these combination of technologies to apply unit testing to all the 
      endpoints of the application and ensure the quality of the code.

  ### Architecture and Structure ###

  #### Architecture ####

    We are using a very comun MVC architecture with all the information flows in one way, this can be a good idea
    for APIs, but maybe can be short for web application when the interaction of the users it´s very high.

  #### Structure ####
    - Controllers:
      It´s the master mind of the application, they controlls the logic and flow of every endpoint. They
      can call or access to services, validator and utils if it´s necesary to accomplish a goal.
      
    - Middlewares:
      They´re intermediates between controllers, and in the most of the cases execute validations, like
      validate token, inpunt data, sanitization and others.

    - Validators: 
      Commonly use as middleware, the validators check the input data and apply some sanitization.

    - Services:
      Provides very basic functionality that can be reuse it along the application, they can comunicate with
      models and third party libraries, and expose his functionality as intermediate.

    - Models:
      Define the structure of the collections with a schema, this stablish fields and theirs validations,
      and it´s expose it by the model. 

    - Routes:
      It´s the intermediate between all the controllers and the express app, the routes define with controllers
      can be expose and initialize all of them.


  ### Final thoughts ###

    For now this is the structure of the application, I was focus on show the way of I create REST APIs with express,
    in the future maybe I can add online documentation for the endpoints with swagger I think, right now I only will focus
    on add new functionality if the app mobile requires or some corrections if I find bugs when start the integration.
    but it's all for this project, finally I want to say thanks if you read this document of access to this repo to check it
    or get some ideas.

    Thank you for reading!
