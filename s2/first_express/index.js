const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.get(['/','/index'], (req, res) => res.send('Hello World!'));
app.get('/name/:nom/:prenom',(req,res)=>{
    res.send(`Hello ${JSON.stringify(req.params)}`)
});

app.post('/name',(req,res)=>{
    res.send(`Hello ${req.body.nom}`)
});

app.post(['/','/index'], (req, res) => res.send('Hello World! by post'));
app.put(['/','/index'], (req, res) => res.send('Hello World! by put'));
app.delete(['/','/index'], (req, res) => res.send('Hello World! delete'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))