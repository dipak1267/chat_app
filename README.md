# Chat App backend (node.js)

One to one chat app code with node.js

## This code contains
- Authentication APIs
- Find users APIs
- Get Conversation and chat APIs
- sockets for messaging

## File structure

```
project
│   README.md    
└───src
    │
    └───server.js
    │
    └───middleware
    │   │   headerMiddleware.js
    │   │   ...
    │
    └───models
    │   │   messgaes.js
    │   │   room.js
    │   │   users.js
    │   │   ...
    │
    └───controller
    │   │   auth_controller.js
    │   │   ...
    │
    └───routes
    │   │   router.js
    │   │   auth_router.js
    │   │   ...
    │
    └───utils
    │   │   db_connection.js
    │   │   ...
    │
    └───validation
        │   validation.js
        │   ...
```

## Steps to install packages for chat app 
- create one folder
- open terminal and enter below comands
> npm init

> npm i express

> npm i bcryptjs

> npm i body-parser

> npm i joi

> npm i jsonwebtoken

> npm i mysql2

> npm i sequelize

> npm i socket.io

> npm i dotenv

> npm i nodemon


# create .env file and paste below content
```
PORT = 8000
SECRET_KEY = "abcd12345678910abcdefghijklmnopqrs12345678910"
SECRET = 'JKNC123ravi'
APP_SECRERT = "CHAT_APP_DIPAK"

REQUIRED_HEADERS =
    "content-type,User-Agent,App-Secret,App-Track-Version,App-Device-Type,App-Store-Version,App-Device-Model,App-Os-Version,App-Store-Build-Number"
```

# test app
- import chat_app.json in postman app 
- press ctrl + ` to open terminal and run npm start comand 
- if terminal show below output then start testing in postman

> server start on localhost:8000