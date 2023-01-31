const {student_schema,student_update_schema} = require('../models/student')
const express = require('express');
const router = express.Router();

let students = [
    {id:1, name:'Student 1', class: 'Class A'},
    {id:2, name:'Student 2', class: 'Class B'},
    {id:3, name:'Student 3', class: 'Class B'},
    {id:4, name:'Student 4', class: 'Class A'}
];

router.get('', (req,res)=>{
    res.send(students);
});

router.get('/:stdId', (req,res)=>{
    let student = students.find(std => std.id === parseInt(req.params.stdId));
    if(!student)
        return res.status(404).send('student with given id is not found.');
    res.send(student);
});

router.post('',  (req, res) => {
  let valid_res = student_schema.validate(req.body);
  if(valid_res.error)
    return res.status(400).send(valid_res.error.message);
  let student = {
    id: students.length + 1,
    name : req.body.name,
    class : req.body.class
  };
  students.push(student);
  res.status(201).send(student);
});

router.put('/:stdId', (req, res) => {
    let valid_res = student_update_schema.validate(req.body);
  if(valid_res.error)
    return res.status(400).send(valid_res.error.message);
    let student = students.find(std => std.id === parseInt(req.params.stdId));
    if(!student)
        return res.status(404).send('student with given id is not found.');
    //update of student
    if(req.body.name)
        student.name = req.body.name
    if(req.body.class)
        student.class = req.body.class
    res.status(202).send(student);
});

router.delete('/:stdId', function(req, res) {
    let student = students.find(std => std.id === parseInt(req.params.stdId));
    if(!student)
        return res.status(404).send('student with given id is not found.');
    students = students.filter(std => std.id !== parseInt(req.params.stdId));
    res.send(student)
});

module.exports=router;