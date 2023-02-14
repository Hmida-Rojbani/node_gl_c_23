const mongoose = require('mongoose')
//mongodb://localhost:27017/dbname
mongoose.connect('mongodb+srv://user:1234@db.mhbax.mongodb.net/gl-c-23?retryWrites=true&w=majority')
.then(()=>console.log('MongoDB is connected'))
.catch(err=>console.error('Mongo not connected, error :',err.message))