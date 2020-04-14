const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

app.use(express.static(path.join(__dirname, 'fagli/dist/fagli')));

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', api);
// app.use('/', (req, res)=>{
//     res.send("Hello world");
// });
app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'fagli/dist/fagli/index.html'));
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))