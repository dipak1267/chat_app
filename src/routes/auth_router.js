const express = require('express');

const authenticationRouter = express.Router();

const { handleUserSingUp, handleUserSingIn } = require('../controller/auth_controller');

authenticationRouter.post('/register', handleUserSingUp);
authenticationRouter.post('/login', handleUserSingIn);

module.exports = { authenticationRouter }