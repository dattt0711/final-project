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

router.get('/home/items', async (req,res)=>{
    const {page=1, home} = req.query;
    const options = {
        limit: 1,
        page: page,
        populate: 'position'
      };
    await Item.paginate({home: home}, options, function(error, result) {
        if (error) {
          console.error(error);
        } else {
          res.json(result)
        }
      })
    // res.json("hello")
})

router.put('/home/item',upload.single('image'), async(req,res) =>{
    try{
        const {position, name, task, description, price, expires, id} = req.body; 
        if(req.file){
            const image = {url: req.file.path, filename: req.file.filename};
            const updateItem = await Item.findByIdAndUpdate(id, {position, name, task, description, price, expires, image});
            res.json(updateItem);
        }
        else{
            const updateItem = await Item.findByIdAndUpdate(id, {position, name, task, description, price, expires});
            res.json(updateItem);
        }
    }catch(err){
        console.log("error update item "+err.message);
    }
})

router.get('/home/item',async(req, res)=>{
    try{
        const {home} = req.query;
        const items = await Item.find({home}).populate('position')
        res.json(items)
    }catch(err){
        console.log("error get all items "+err.message);
    }
})

router.get('/home/item/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const item = await Item.findById(id).populate('position');
        res.json(item);
    }catch(err){
        console.log("error get item by id "+err.message);
    }
})

router.delete('/home/item/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const deletedItem = await Item.findById(id);
        const position = deletedItem.position;
        const home = deletedItem.home;
        await Item.findByIdAndDelete(id);
        await Position.findByIdAndUpdate(position, {$pull:{items: id}});
        await Home.findByIdAndUpdate(home, {$pull:{items: id}})
        res.json(deletedItem)
    }catch(err){
        console.log("error delete item "+err.message);
    }
})

router.get('/search/home/item', async (req, res)=>{
    try{
        const {keyword, type, home} = req.query;
        switch(type){
            case "name":
                let items = await Item.find({home});
                let listSearch = items.filter(item=>item.name.includes(keyword));
                res.json(listSearch);
                break;
            case "position":
                let itemsPos = await Item.find({}).populate('position');
                let listSearchPos = itemsPos.filter(item=>item.position.name.includes(keyword));
                res.json(listSearchPos);
                break;
        }
    }catch(err){
        console.log("error search", err.message);
    }
})
module.exports = router