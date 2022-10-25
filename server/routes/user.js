const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/user.model');
const { isLoggedIn } = require('../middleware');

router.route('/register')
    .get((req, res)=>{
        res.status(200).json({Message: "Please post and register a new user"})
    })
    .post(async (req,res, next)=>{
        try{
/*             console.log(req.body) */
            let museum = []
            const {username, password } = req.body
            const user = new User({username, museum});
/*             console.log(user) */
            const registerUser = await User.register(user, password);
            req.login(registerUser, err => {
                if (err){
                    return next(err);
                }
                res.status(200).json({data: registerUser, message: "Success!"})
            })
        } catch(e){
            console.log(e)
            res.status(400).json({message: "FAILED at registering user"})
        }
    })

router.route('/login')
    .get((req, res)=>{
        res.status(200).json({message: "NEED TO GIVE PAGE to post and load"})
    })
    .post(
        passport.authenticate('local', {failureMessage: true }), (req, res, next)=>{
/*             const redirectUrl = req.session.returnTo || '/home';
            delete req.session.returnTo; */
            res.status(208).json({message: "User signed in", data: req.session})
        }
    )

router.route('/account')
    .get(isLoggedIn, async(req, res)=>{
        id = req.user["_id"]
        await User.findById(id)
            .then(data =>{
                let payload = {id: data._id, username: data.username, museum: data.museum}
                res.status(200).json({payload, message: "user found"})
            })
            .catch(err =>{
                res.status(404).json({message: "unable to be found"})
            })
/*         res.status(200).json({id: req.user._id, message:"THIS SHOULD WORK"}) */
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
