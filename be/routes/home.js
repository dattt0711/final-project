const express = require('express');
const router = express.Router();
const Home = require('../models/home');

router.post('/home', async(req,res)=>{
    try{
        const {user, home} = req.body;
        const newHome = new Home({user, home});
        await newHome.save();
        res.json(newHome);
    }catch(err){
        console.log("error create home "+err.message);
    }
})

module.exports = router