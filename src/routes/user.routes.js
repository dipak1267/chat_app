const express = require('express');
const validationMiddleware = require('../middleware/validation_middleware');
const header_middleware = require('../middleware/header_middleware');
const validation = require('../validation/user_validation');
const userRouter = express.Router();

const {  updateUserProfile, getUserDetail, changePassword} = require('../controller/user_controller');

userRouter.post('/updateUserProfile',header_middleware.checkAuthToken, updateUserProfile);
userRouter.get('/getUserDetail',header_middleware.checkAuthToken,getUserDetail);
userRouter.put('/changePassword', validationMiddleware(validation.changePassword),header_middleware.checkAuthToken,changePassword);

module.exports = { userRouter }