const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get('/comment', async (req, res) => {
    try{
        const {home} = req.query;
        const comments = await Comment.find({home}).populate('owner');
        res.json(comments);
    }catch(err){
        console.log("error get comments");
    }
})

router.post('/comment/react', async (req, res) => {
    try{
        const {id} = req.body;
        const cmt = await Comment.findById(id);
        cmt.isReact = !cmt.isReact;
        await cmt.save();
        res.json(cmt);
    } catch(err) {
        console.log("error react comment", err.message);
    }
})

router.post('/comment', async(req,res)=>{
    try{
        const {comment, home, owner} = req.body;
        const newComment = new Comment({comment, home, owner});
        await newComment.save();
        res.json(newComment);
    }catch(err){
        console.log("error create comment "+err.message);
    }
})

router.post('/comment/reply', async(req,res)=>{
    try{
        const {id, rep, username} = req.body;
        const comment = await Comment.findById(id);
        comment.reply.push({rep, username});
        comment.save();
        res.json(comment);
    }catch(err){
        console.log("Error reply comment")
    }
})

module.exports = router;