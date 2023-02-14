const mongoose = require('mongoose')

let student_schema = new mongoose.Schema({
    name : String,
    inscriptationDate : {
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

let Student = mongoose.model('Student',student_schema);
module.exports.Student=Student;