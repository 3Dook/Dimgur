const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/user.model');
const { isLoggedIn } = require('../middleware');

router.route('/blob')
    .get(async(req, res)=>{
        //get an image based on id of image

    })
    .post(isLoggedIn, async (req,res, next)=>{
        try{
            //make a new images and save owner to user and user to owner
        } catch(e){
            console.log(e)
            res.status(400).json({message: "FAILED at making new Image"})
        }
    })
    .delete(isLoggedIn, async (req, res)=>{
        id = req.user["_id"]
        await User.findByIdAndDelete(id)
            .then(data =>{
                req.logout();
                res.status(201).json({message: "SUCCESS - USER DELETED"})
            })
            .catch(err =>{
                res.status(404).json({message: "UNABLE TO DELETE"})
            })
    })

module.exports = router;