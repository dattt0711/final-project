const express = require('express');
const router = express.Router();
const Home = require('../models/home');
const User = require('../models/user');


// router.post('/register', async(req,res)=>{
//     try{
//         const {username, password} = req.body;
//         const newUser = new User({username, password});
//         await newUser.save();
//         res.json(newUser);
//     } catch(err){
//         console.log("error register"+err.message);
//     }
// })

module.exports = router