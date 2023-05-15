const joi = require("joi")

const updateUserProfile = joi.object({
    oldPassword: joi.string().trim()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    user_password: joi.string().trim()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const changePassword = joi.object({
    old_password: joi.string().trim()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    user_password: joi.string().trim()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});




module.exports = { 
    changePassword
}