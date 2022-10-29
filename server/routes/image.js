const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/user.model');
const Img = require("../models/image.model");
const { isLoggedIn } = require('../middleware');

const multer = require('multer');
const path = require('path');
const fs = require('fs')
const { ObjectId } = require('mongodb');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    let pathName = new ObjectId();
    const extension = file.mimetype.split('/')[1];
    const fileName = pathName + '.' + extension;
    cb(null, fileName)
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.route('/')
    .post(isLoggedIn, upload.single('productImage'), async (req,res, next)=>{
        try{
            //make a new images and save owner to user and user to owner

            let id = req.user["_id"]
            const product = new Img({
                owner: id,
                title: req.body.title,
                description: req.body.description,
                path: req.file.path
            })
            product
                .save()
                .then(result =>{
                    console.log(result)
                    // need to update USER list of museum 
                    User.findByIdAndUpdate(id, {
                        $push: {museum: result._id.toString()}
                    }, function(err, docs){
                        //delete this for production
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log('Updated User: ', docs);
                        }
                    })
                    res.status(201).json({
                        message: 'Created image sucessfully',
                        id: result._id
                    })
                })
                .catch(error =>{
                    console.log(error);
                    res.status(400).json({
                        message: 'failed in creating image'
                    })
                })
        } catch(e){
            console.log(e)
            res.status(400).json({message: "FAILED at making new Image"})
        }
    })


router.route('/:id')
    .get(async(req, res)=>{
        //get an image based on id of image
        await Img.findById(req.params.id)
                .then(result =>{
                    //get the path of the file.
                    let temp = __dirname;
                    temp = temp.slice(0, -7)
                    temp = temp + "\\" + result.path
                    
                    res.status(202).sendFile(temp, function(err){
                        if (err){
                            console.log(err)
                        } else {
                            console.log('sucesss')
                        }
                    });
                })
                .catch(error =>{
                    res.status(404).json({
                        message: "Image not found"
                    })
                })

    })
    .delete(isLoggedIn, async (req, res)=>{
        let userId = req.user["_id"]
        let id = req.params.id

        await Img.findById(id)
            .then(async data =>{
                console.log(data.owner.toString())
                console.log(userId.toString())
                if (data.owner.toString() === userId.toString()) {
                    // delete it because it is correct
                    Img.deleteOne(id)
                    //remove it from the server as well
                    //get the path of the file.

                    let temp = __dirname;
                    temp = temp.slice(0, -7)
                    temp = temp + "\\" + data.path
                    fs.unlink(temp,function(err){
                            if(err) return console.log(err);
                            console.log('file deleted successfully');
                    });  

                    // find and delete from user's museum collections
                    User.findByIdAndUpdate(id, {
                        $pull: {museum: data._id.toString()}
                    }, function(err, docs){
                        //delete this for production
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log('Updated User: ', docs);
                        }
                    })

                    res.status(202).json({message: "successfully deleted"})
                }
                else{
                    res.status(403).json({message: "invalid owner, unable to delete"})
                }

            })
            .catch(err =>{
                res.status(404).json({message: "UNABLE TO DELETE", err})
            })
    })

module.exports = router;