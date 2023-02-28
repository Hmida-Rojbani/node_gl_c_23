const mongoose = require('mongoose')
const Joi = require('joi')
const uniqueValidator = require('mongoose-unique-validator');
Joi.objectId = require('joi-objectid')(Joi)
let student_schema = new mongoose.Schema({
    name : {
        type :String,
        minLength : 3,
        maxLength : 50,
        required: true
    },
    inscriptionDate : {
        type: Date,
        default : Date.now()
    },
    age : {
        type :Number,
        required: true
    },
    active : Boolean,
    payedAmount : {
        type :Number,
        required : function () {
            return this.active;
        }
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    classRoom : {
        id : {
            type : mongoose.Types.ObjectId,
            ref: 'ClassRoom'
        },
        name : String
    }
});

const validation_schema = Joi.object({
    name : Joi.string().min(3).max(50).required(),
    inscriptionDate : Joi.date().iso(),
    age : Joi.number().min(18).integer().positive().required(),
    active : Joi.boolean(),
    payedAmount : Joi.number().positive(),
    email : Joi.string().email().required(),
    classID :Joi.objectId()
})
//.with('active','payedAmount');

student_schema.methods.validateInputData = function (data) {
    return validation_schema.validate(data).error;
}
student_schema.plugin(uniqueValidator);

let Student = mongoose.model('Student',student_schema);
module.exports.Student=Student;