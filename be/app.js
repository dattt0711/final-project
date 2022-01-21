const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser') 
const cors = require('cors');
mongoose.connect('mongodb://127.0.0.1:27017/house-management');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('database connected');
})

const authMiddleware = require('./middleware/auth');

const userRoute = require('./routes/user');
const homeRoute = require('./routes/home');
const positionRoute = require('./routes/position');
const itemRoute = require('./routes/item');
const authRoute = require('./routes/auth');
const commentRoute = require('./routes/comment')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', userRoute);
app.use('/', homeRoute);
app.use('/', positionRoute);
app.use('/', itemRoute);
app.use('/', authRoute);
app.use('/', commentRoute);
app.listen(3003, ()=>{
    console.log('listen on port 3003')
})