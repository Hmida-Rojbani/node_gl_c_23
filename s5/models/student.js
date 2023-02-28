const mongoose = require('mongoose')
const Joi = require('joi')
let student_schema = new mongoose.Schema({
    name : String,
    inscriptionDate : {
        type: Date,
        default : Date.now()
    },
    age : Number,
    active : Boolean,
    payedAmount : Number,
    email : {
        type : String,
        unique : true,
        required : true
    }
});

const validation_schema = Joi.object({
    name : Joi.string().min(3).max(50).required(),
    inscriptionDate : Joi.date().iso(),
    age : Joi.number().min(18).integer().positive().required(),
    active : Joi.boolean(),
    payedAmount : Joi.number().positive(),
    email : Joi.string().email().required()
});

student_schema.methods.validateInputData = function (data) {
    return validation_schema.validate(data).error;
}

let Student = mongoose.model('Student',student_schema);
module.exports.Student=Student;