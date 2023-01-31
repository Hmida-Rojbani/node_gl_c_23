const express = require('express');
const student_router = require('./routers/students')
const welcome_router = require('./routers/welcome')
const app = express();
const port = 3000;
app.use(express.json());

app.use('/api/welcome',welcome_router)
app.use('/api/students',student_router);

app.listen(port,()=>console.log(`Students API running on ${port}`));