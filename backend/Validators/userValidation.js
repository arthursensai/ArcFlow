const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const usernameSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(10).required()
});

module.exports = {
    signupSchema,
    loginSchema,
    usernameSchema
}