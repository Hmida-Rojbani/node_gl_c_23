const express = require('express');
const {student_schema,student_update_schema} = require('./models/student')
const app = express();
const port = 3000;

let students = [
    {id:1, name:'Student 1', class: 'Class A'},
    {id:2, name:'Student 2', class: 'Class B'},
    {id:3, name:'Student 3', class: 'Class B'},
    {id:4, name:'Student 4', class: 'Class A'}
];

app.get('/api/students', (req,res)=>{
    res.send(students);
});

app.get('/api/students/:stdId', (req,res)=>{
    let student = students.find(std => std.id === parseInt(req.params.stdId));
    if(!student)
        return res.status(404).send('student with given id is not found.');
    res.send(student);
});

app.use(express.json());



app.post('/api/students',  (req, res) => {
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



app.put('/api/students/:stdId', (req, res) => {
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
// delete TODO
app.delete('/api/students/:stdId', function(req, res) {
    let student = students.find(std => std.id === parseInt(req.params.stdId));
    if(!student)
        return res.status(404).send('student with given id is not found.');
    students = students.filter(std => std.id !== parseInt(req.params.stdId));
    res.send(student)
});

app.listen(port,()=>console.log(`Students API running on ${port}`));