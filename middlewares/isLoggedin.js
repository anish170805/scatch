const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.isLoggedin = async (req, res, next) =>{
    if(!req.cookies.token){
        req.flash("error", "you need to login first");
        return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({email: decoded.email})
        .select('-password');
        if (!user) {
            req.flash("error", "User not found, please login again");
            return res.redirect("/");
        }
        req.user = user;
        next();

    }catch(err){
        req.flash("error", 'something went wrong');
        res.redirect("/");
    }
}
