const express = require('express');
const mongoose = require('mongoose');
const { isLoggedin } = require('../middlewares/isloggedin');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin:false });
});

router.get("/shop", isLoggedin, async (req, res) => {
    try {
        const products = await productModel.find({});
        const sortby = req.query.sortby || 'popular';
        let success = req.flash("success");
        res.render("shop", { products, sortby, success });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading products");
    }
});

router.get("/addtocart/:productid", isLoggedin, async (req,res)=>{
    try {
        let user = await userModel.findOne({email:req.user.email});
        if (!user.cart) {
            user.cart = [];
        }
const productId = new mongoose.Types.ObjectId(req.params.productid);
        req.flash("success", "added to cart");
        res.redirect("/shop");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.get("/cart", isLoggedin, async (req,res)=>{
   try {
       let user = await userModel
       .findOne({email:req.user.email})
       .populate("cart", null, null, { strictPopulate: false });

       if (!user) {
           console.error("User not found in /cart route");
           return res.status(404).send("User not found");
       }

       console.log("User cart populated:", JSON.stringify(user.cart, null, 2));

       let bill = 0;
       if (user.cart && user.cart.length > 0) {
           bill = user.cart.reduce((acc, product) => {
               return acc + (Number(product.price) - Number(product.discount || 0));
           }, 0) + 20; // Assuming 20 is some fixed charge like shipping
       }
       res.render("cart", {user, bill});
   } catch (err) {
       console.error("Error loading cart:", err.stack || err);
       res.status(500).send("Error loading cart");
   }
})

module.exports = router;
