const router = require('express').Router();
const  mongoose  = require('mongoose');
const {Student} = require('../models/student');
const _ = require('lodash');
const { ClassRoom } = require('../models/classroom');

router.post('/',async (req,res)=>{
     let student = new Student(req.body);
    
    try {
        //var student = await Student.create(req.body);
        let error = student.validateInputData(req.body);
        if(error)
            return res.status(400).send(error.message);
        let classRoom = await ClassRoom.findById(req.body.classID);
        if(!classRoom)
            return res.status(400).send('classRoom Id not found')
        student.classRoom.id = classRoom._id;
        student.classRoom.name = classRoom.name;
        classRoom.student_number++;
        
        student = await student.save();
        classRoom.students.push(student._id);
        await classRoom.save();
    } catch (error) {
        return res.status(400).send(error.message)
    }
    
    res.status(201).send(student);
});

router.get('/', async (req, res) => {
    let students = await Student.find();
    res.status(200).send(students);
})

router.get('/id/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('Object Id is not valid')
    let student = await Student.findById(req.params.id)
                                .populate('classRoom.id');
    if(!student)
        return res.status(404).send('Id not found')
    res.status(200).send(student);
});

router.get('/id/:id/modules', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('Object Id is not valid')
    let student = await Student.findById(req.params.id)
                                .populate('classRoom.id');
    if(!student)
        return res.status(404).send('Id not found')
    res.status(200).send(student.classRoom.id.modules);
});

router.put('/id/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('Object Id is not valid')
    let student = await Student.findById(req.params.id);
    if(!student)
        return res.status(404).send('Id not found')
    student = _.merge(student,req.body);
    student = await student.save();
    res.status(200).send(student);
});

router.delete('/id/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('Object Id is not valid')
    let student = await Student.findByIdAndDelete(req.params.id);
    if(!student)
        return res.status(404).send('Id not found')
    res.status(200).send(student);
});

router.get('/active/:active', async (req, res) => {
    let students = await Student.find({active : req.params.active})
    res.status(200).send(students);
})

router.get('/active/:active/page/:page/size/:size', async (req, res) => {
    let students = await Student.find({active : req.params.active})
                            .skip((req.params.page-1)*req.params.size)
                            .limit(req.params.size);
    res.status(200).send(students);
})
//$eq $neq $in $nin $gt $gte $lt $lte 
router.get('/age/:min/:max', async (req, res) => {
    let students = await Student.find({age : {$gte : req.params.min, $lt : req.params.max}});
    res.status(200).send(students);
})

module.exports=router;