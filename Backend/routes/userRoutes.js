const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user-model");
const HttpError = require("../util/http-error-message");

router.post("/signup",async (req,res,next) => {
    
    const email = req.body.email;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password , salt);

    let userFound;
    try{
        userFound = await User.findOne({email:email});
    }catch(err){
        console.log(err);
        next(new HttpError("Something went wrong.",500));
    }

    if(userFound){
        next(new HttpError("User already exists!",500));
    }

    const newUser = new User({
        name:req.body.name,
        email:email,
        password:password
    });

    try{
        await newUser.save();
    }catch(err){
        console.log(err);
        next(new HttpError("User not saved.",500));
    }

    res.json({user:newUser.toObject({getters:true})});
});

router.post("/login",async (req,res,next) => {

    const email = req.body.email;

    let userFound;
    try{
        userFound = await User.findOne({email:email});
    }catch(err){
        console.log(err);
        next(new HttpError("Something went wrong",500));
    }
    
    if(!userFound){
        next(new HttpError("User doesnot exists.Please signup",500));
    }else{
        const auth = await bcrypt.compare(req.body.password , userFound.password);
        if(!auth){
            res.status(500);
            res.json({message:"Wrong Password"});
        }
    }

    res.json({user: userFound.toObject({getters:true})});
})

module.exports = router;