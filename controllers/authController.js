const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');


module.exports.registeredUser =  async (req,res)=>{
    try{
        let {email, password ,fullname} = req.body;

        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("you already have account");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user = await userModel.create({
            email,
            password: hash,
            fullname,
        });

        let token =  generateToken(user);
        res.cookie('token', token);
        res.status(201).json({ message: 'User registered successfully', user });

    }catch(err){
        console.log(err.message);
        res.status(500).json({ error: 'Failed to register user', message: err.message });
    }
}

module.exports.loginUser = async (req,res)=>{
    let {email, password} =req.body;
    let user = await userModel.findOne({email:email});
    if(!user) return res.send("wrong credentials");
    bcrypt.compare(password, user.password,(err, result) =>{
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect('/shop');
        }else{
            res.send("wrong credentials");
        }
    })
}


module.exports.logout = (req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
};
