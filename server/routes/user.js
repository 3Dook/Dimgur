const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/user.model');
const { isLoggedIn, isCookied } = require('../middleware');

router.route('/register')
    .get((req, res)=>{
        res.status(200).json({message: "Please post and register a new user"})
    })
    .post(async (req,res, next)=>{
        try{
            //console.log(req.body)
            const {username, password } = req.body
            const user = new User({username});
            const registerUser = await User.register(user, password);
            req.login(registerUser, err => {
                if (err){
                    return next(err);
                }
                res.cookie("user_token", registerUser._id)
                res.status(200).json({data: registerUser, message: "Success!"})
            })
            
        } catch(e){
            res.status(400).json({message: "FAILED at registering user", e})
        }
    })

router.route('/login')
    .get((req, res)=>{
        res.status(200).json({message: "NEED TO GIVE PAGE to post and load"})
    })
    .post(
        passport.authenticate('local'), (req, res)=>{
            const redirectUrl = req.session.returnTo || '/home';
            delete req.session.returnTo;
            /*             res.cookie("user_id", req.user._id ) */
            res.cookie("user_token", req.user._id)
            res.status(208).json({message: "User signed in", data: req.user._id})
    })

router.route('/account')
    .get(isLoggedIn, (req, res)=>{
        res.status(200).json({data: req.user.id, message:"user is signed on"})
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

router.route('/acc')
    .get(isCookied, (req, res)=>{
        
        res.status(200).json({id: req.cookies["user_token"], message:"user is signed on sorta"})
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

router.route('/logout')
    .get(isLoggedIn, (req, res)=>{
        res.status(210).json({message: 'need to give logout page'})
    })
    .post(isLoggedIn, (req, res)=>{
        req.logout();
        res.status(211).json({message: "successfully LOGGED OUT"})
    })

module.exports = router;