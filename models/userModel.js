const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        minlength : 3,
        trim : true,
    },
    email : String,
    password: String,
    cart: [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    orders: {
        type : Array,
        default : []
    },
    contact: Number,
    picture : String
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
module.exports = userModel;
