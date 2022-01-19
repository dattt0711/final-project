const express = require('express');
const router = express.Router();
const Position = require('../models/position');
const Item = require('../models/item');
const Home = require('../models/home');
const moment = require('moment');
const mongoose = require('mongoose');
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})
router.post('/home/item', upload.single('image'), async(req,res)=>{
    try{
        console.log(req.body)
        const {position, name, task, description, price, expires, home} = req.body;
        const newItem = new Item({position, name, task, description, price, expires, home});
        newItem.image = {url: req.file.path, filename: req.file.filename};
        const findPos = await Position.findById(position);
        const findHome = await Home.findById(home);
        findPos.items.push(newItem);
        findHome.items.push(newItem);
        await newItem.save();
        await findPos.save();
        await findHome.save();
        res.json(newItem);
    } catch(err){
        console.log("error create Item: "+err.message);
    }
})

router.put('/home/item', async(req,res) =>{
    try{
        const {position, name, task, description, price, expires, item_id} = req.body;
        const findItem = await Item.findById(item_id);
        // If update new position for item, then remove item in old position
        if(findItem.position.toString()!=position){
            // delete item in old position
            await Position.findByIdAndUpdate(findItem.position, {$pull:{items:item_id}});
            // add item in new position
            const newPosition = await Position.findById(position);
            newPosition.items.push(findItem);
            newPosition.save();
            const updateItem = await Item.findByIdAndUpdate(item_id, {position, name, task, description, price, expires});
        }
        else{
            const updateItem = await Item.findByIdAndUpdate(item_id, {position, name, task, description, price, expires});
        }
        res.json(findItem);
    }catch(err){
        console.log("error update item "+err.message);
    }
})

router.get('/home/item',async(req, res)=>{
    try{
        const {home} = req.query;
        const items = await Item.find({home})
        res.json(items)
    }catch(err){
        console.log("error get all items "+err.message);
    }
})

router.get('/home/item/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const item = await Item.findById(id);
        console.log(item)
        res.json(item);
    }catch(err){
        console.log("error get item by id "+err.message);
    }
})

router.delete('/home/item', async(req, res)=>{
    try{
        const deletedItem = await Item.findById(item_id);
        const position = deletedItem.position;
        const home = deletedItem.home;
        await Item.findByIdAndDelete(item_id);
        await Position.findByIdAndUpdate(position, {$pull:{items: item_id}});
        await Home.findByIdAndUpdate(home, {$pull:{items: item_id}})
        res.json(deletedItem)
    }catch(err){
        console.log("error delete item "+err.message);
    }
})

router.post('/test/image', upload.single('image'), async(req,res) => {
    try{
        res.send({url: req.file.path, filename: req.file.filename});
    }catch(err){
        console.log("error upload image", err.message)
    }
})
module.exports = router