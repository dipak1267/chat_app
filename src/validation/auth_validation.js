const joi = require("joi")


const register =
    joi.object({
        user_name: joi.string()
            .trim()
            .min(2)
            .max(20)
            .required(),
        user_email: joi.string().trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', ] } }, { allowFullyQualified: 1 }).required(),
        user_password: joi.string().trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

const login =
joi.object({
    user_email: joi.string().trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', ] } }, { allowFullyQualified: 1 }).required(),
    user_password: joi.string().trim()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const forgotPassowrd =
joi.object({
    user_email: joi.string().trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', ] } }, { allowFullyQualified: 1 }).required()
});

const changePasswordWithVerificationCode =
joi.object({
    verify_code: joi.string()
    .trim()
    .min(4)
    .max(4)
    .required(),
    user_email: joi.string().trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', ] } }, { allowFullyQualified: 1 }).required(),
        user_password: joi.string().trim()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});








module.exports = {
    register,
    login,
    forgotPassowrd,
    changePasswordWithVerificationCode,
}