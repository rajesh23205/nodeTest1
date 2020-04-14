const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');

// const api = require('./server/routes/api');

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use('/', api);
app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname,'dist/fagli/index.html'));
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))