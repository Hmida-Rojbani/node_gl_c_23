const express = require('express');
const student_router = require('./routers/students')
const welcome_router = require('./routers/welcome')
const morgan = require('morgan')
const config = require('config')
const appDebug = require('debug')('app:debug')
const appPort = require('debug')('app:port')
const app = express();
const port = 3000;
app.use(express.json());
appDebug('Env express : ',app.get('env'))
appDebug('Env Node :',process.env.NODE_ENV)
appDebug('Application name : ',config.get('app'))
appDebug('DB : ',config.get('db'))
if(app.get('env')==='development')
    app.use(morgan('dev'))
// app.use(function (req,res,next) {
//     req.data=' GLSI'
//     res.cls= ' -C'
//     console.log('I passed from here');
//     next();
// })
app.use('/api/welcome',welcome_router)



app.use('/api/students',student_router);

app.listen(port,()=>appPort(`Students API running on ${port}`));