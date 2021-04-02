const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(express.static('public'));
 
app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(3000,()=> console.log('Listening on port 3k...'));