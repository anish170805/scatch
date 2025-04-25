const express = require('express');
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");
const { isLoggedin } = require('../middlewares/isloggedin');

router.get('/', (req,res)=>{
    res.send('hey');
})

if(process.env.NODE_ENV === "development" ){
    router.post("/create", async (req,res)=>{
         let owners = await ownerModel.find();
         if(owners.length > 0){
            return res
            .status(503)
            .send("already exists");
         }
         const { fullname, email, password } = req.body;
         if (!fullname || !email || !password) {
            return res.status(400).send("Missing required fields");
         }
         let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
         });
         res.status(200).send(createdOwner);
    })
}

router.get('/admin', isLoggedin, async (req,res)=>{
   try {
       let success = req.flash("success");
       res.render('createproducts', {success});
   } catch (err) {
       console.error(err);
       res.status(500).send("Error loading admin page");
   }
})

module.exports = router;
