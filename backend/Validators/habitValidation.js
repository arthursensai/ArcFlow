const Joi = require('joi');

const habitSchema = Joi.object({
    title: Joi.string().alphanum().min(3).max(15).required(),
    description: Joi.string().min(10).max(50).required()
});

module.exports = {
    habitSchema
}