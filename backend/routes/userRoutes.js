const express = require('express')
const mongoose = require('mongoose')
const user = require('../models/usermodels.js')

const router = express.Router()

router.post('/',async(req,res)=>{
    const {name,email,gender}= req.body;
    console.log(req.body)
    try {
        const userData = await user.create({
            name:name,
            email:email,
            gender:gender,
            // age:age
        });
    res.status(200).json(userData);
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            error:error.message
        })
    }
});

router.get('/',async(req,res)=>{ 
    try {
        const showAll = await user.find();
        if(showAll){
            return res.status(200).json(showAll);           }
            return res.json({
            msg:"not found" })
        }   
    catch (error) {
        console.log(error)
        res.status(400).json({
            error:error.message
        })
    } 

    res.send('api running')
});

router.get('/:id',async(req,res)=>{ 
    const {id} = req.params;

    try {
        const singleUser = await user.findById({_id :id});
        if(singleUser){
            return res.status(200).json(singleUser);
        }
            return res.json({
            msg:"not found" })
        }   
    catch (error) {
        console.log(error)
        res.status(400).json({
            error:error.message
        })
    } 
})

router.delete('/:id',async(req,res)=>{ 
    const {id} = req.params;

    try {
        const deletedUser = await user.findByIdAndDelete({_id :id});
        if(deletedUser){
            console.log("Deleted users data successfully") 
            return res.status(200).json(deletedUser);
        }
            return res.json({
            msg:"not found" })
        }   
    catch (error) {
        console.log(error)
        res.status(400).json({
            error:error.message
        })
    } 
})

router.patch('/:id',async (req,res)=>{ 
    const {id} = req.params;
    const {name, email, gender} = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if(updatedUser){
            console.log("Updated value for ",id)
            return res.status(200).json(updatedUser);
        }
            return res.json({
            msg:"not found" })
        }   
    catch (error) {
        console.log(error)
        res.status(400).json({
            error:error.message
        })
    } 
})

module.exports = router;