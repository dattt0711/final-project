const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser') 

mongoose.connect('mongodb://127.0.0.1:27017/house-management');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('database connected');
})

app.listen(3003, ()=>{
    console.log('listen on port 3000')
})