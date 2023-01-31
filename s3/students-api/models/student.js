const Joi = require('joi');

let student_schema = Joi.object({
    id: Joi.number().integer().positive(),
    name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,25}$')).required(),
    class: Joi.string().alphanum().min(3).max(10).required()
});

let student_update_schema = Joi.object({
    id: Joi.number().integer().positive(),
    name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,25}$')),
    class: Joi.string().alphanum().min(3).max(10)
});

module.exports.student_schema=student_schema;
module.exports.student_update_schema=student_update_schema;