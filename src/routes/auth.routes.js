const express = require('express');
const validationMiddleware = require('../middleware/validation_middleware');
const validation = require('../validation/auth_validation');
const authenticationRouter = express.Router();

const { handleUserSingUp, handleUserSingIn ,forgotPassword,changePasswordWithVerificationCode} = require('../controller/auth_controller');

authenticationRouter.post('/register',validationMiddleware(validation.register), handleUserSingUp);
authenticationRouter.post('/login', validationMiddleware(validation.login),handleUserSingIn);
authenticationRouter.post('/forgotPassowrd', validationMiddleware(validation.forgotPassowrd),forgotPassword);
authenticationRouter.post('/changePasswordWithVerificationCode', validationMiddleware(validation.changePasswordWithVerificationCode),changePasswordWithVerificationCode);

module.exports = { authenticationRouter }