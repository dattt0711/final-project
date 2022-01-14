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

const userRoute = require('./routes/user');
const homeRoute = require('./routes/home');
const positionRoute = require('./routes/position');
const itemRoute = require('./routes/item');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', userRoute);
app.use('/', homeRoute);
app.use('/', positionRoute);
app.use('/', itemRoute);
app.listen(3003, ()=>{
    console.log('listen on port 3003')
})