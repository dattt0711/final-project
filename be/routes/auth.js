require('dotenv').config()
// library
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})
// model
const User = require('../models/user');
const Home = require('../models/home');
//@route POST /auth/register
//@desc Register user
//@access Public
router.post('/register', async (req, res) => {
    console.log('he')
    const {username, password, image} = req.body;
    if(!username || !password)
    return res.status(400).json({success: false, message: "Missing username or password"})

    try{
        // Check existed user
        const user = await User.findOne({username});

        if(user)
        return res.status(400).json({success: false, message: "Username has already been registered"})

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashedPassword, image});
        await newUser.save();
        
        const newHome = new Home({user: newUser._id, home: "home1"});
        await newHome.save();
        // Return token
        const accessToken = jwt.sign({
            userID: newUser._id,
            home: newHome._id
        },
            process.env.ACCESS_TOKEN_SECRET
        )
        return res.json({success: true, message: 'UsWr created successfully', accessToken, home: newHome._id})
    }catch(err){
        console.log(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
})
//@route POST /update/profile
//@desc Update avatar
//@access Private
router.put('/update/profile',  upload.single('image'), async(req,res)=>{
    try{   
        const {id} = req.body;
        if(req.file){
            const url = req.file.path;
            const updateUser = await User.findByIdAndUpdate(id, {image: url}, {new:true});
            res.json(updateUser);
        }
    }catch(err){
        console.log("error update profile "+err.message);
    }
})
//@route POST /auth/login
//@desc Login
//@access Public
router.post('/login', async(req,res)=>{
    const {username, password} = req.body;
    console.log(req.body)
    if(!username || !password)
    return res.status(400).json({success: false, message: "Missing username or password"})  
    try{
        // Check for existing user
        const user = await User.findOne({username});
        const home = await Home.findOne({user:user._id});
        if(!user) 
        return res.status(400).json({success: false, message: "Incorrect username or password"})

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({success: false, message: "Incorrect username or password"})

        // Return token
        const accessToken = jwt.sign({
            userID: user._id,
            home: home._id,
            user: user._id,
            username: user.username
        },
            process.env.ACCESS_TOKEN_SECRET
        )
        return res.json({success: true, message: 'Login successfully', accessToken, home: home._id, user: user._id, username: user.username, avatar: user.image})
    }catch(err){
        console.log("err",err)
        res.status(500).json({success: false, message: "Internal server error"})
    }
})
module.exports = router;