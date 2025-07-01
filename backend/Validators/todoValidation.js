const Joi = require('joi');

const todoSchema = Joi.object({
    title: Joi.string().alphanum().min(3).required()
});

module.exports = {
    todoSchema
};