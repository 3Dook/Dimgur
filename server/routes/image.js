const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/user.model');
const Img = require("../models/image.model");
const { isLoggedIn } = require('../middleware');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
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
    .post(/* isLoggedIn,  */upload.single('productImage'), async (req,res, next)=>{
        try{
            //make a new images and save owner to user and user to owner
            const product = new Img({
/*                 owner: "1234", */
                title: req.body.title,
                description: req.body.description,
                path: req.file.path
            })

            product
                .save()
                .then(result =>{
                    console.log(result)
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
                    console.log(temp)
                    
                    res.status(202).sendFile(temp, function(err){
                        if (err){
                            console.log(err)
                        } else {
                            console.log('sucesss')
                        }
                    });
/*                     res.status(201).json({
                        message: "found image",
                    }) */
                })
                .catch(error =>{
                    res.status(404).json({
                        message: "Image not found"
                    })
                })

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