const express = require('express');
const router = express.Router();
const Home = require('../models/home');
const Position = require('../models/position');


router.post('/home/position', async(req,res)=>{
    try{
        const {home, name} = req.body;
        const newPosition = new Position({home, name});
        const findHome = await Home.findById(home);
        findHome.positions.push(newPosition);
        await newPosition.save();
        await findHome.save();
        res.json(newPosition);
    } catch(err){
        console.log("error create position: "+err.message);
    }
})

router.get('/home/position', async(req,res)=>{
    try{
        const {home} = req.query;
        const positions = await Position.find({home});
        res.json(positions);
    }catch(err){
        console.log("error get position ", err.message);
    }
})

router.put('/home/position', async(req,res)=>{
    try{
        const {pos_id, name} = req.body;
        await Position.findByIdAndUpdate(pos_id, {name});
    }catch(err){
        console.log("error update position", err.message)
    }
})

router.delete('/home/position', async(req,res)=>{
    try{
        const {pos_id} = req.body;
        const deletedPos = await Position.findByIdAndDelete(pos_id);
        await Home.findByIdAndUpdate(deletedPos.home, {$pull:{positions: pos_id}});
        res.json(deletedPos)
    } catch(err){
        console.log("error delete position", err.message)
    }
})

module.exports = router