//express handles api requets
const express = require("express");
const router = express.Router();

// here we have imported request model for crud operations
const Request = require("../models/Request");

//Create pickup request (for user)
router.post('/', async(req, res) =>{
    try{
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest); //responding with the saveRequest
    } catch (err) {
        res.status(500).json({error: err.message}); //server error
    }
    
});

//Read or get all requests (for admin)
router.get('/', async(req, res) => {
    try {
        const requests = await Request.find().sort({createdAt: -1});
        res.json(requests); //responding with all requests
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//update request by admin using findByIdAndUpdate
router.put('/:id', async(req, res) => {
    try{
        const updatedRequest = await Request.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} //new: true returns the updated document
        );
        res.json(updatedRequest);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//Delete request by admin using id
router.delete('/:id', async (req,res) => {
    try{
        await Request.findByIdAndDelete(req.params.id);
        res.json({message: "Request deleted succesfully"});
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;