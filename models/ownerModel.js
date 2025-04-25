const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname : {
        type : String,
        minlength : 3,
        trim : true,
    },
    email : String,
    password: String,
    products: {
        type : Array,
        default : []
    },
    orders: {
        type : Array,
        default : []
    },
    picture : String
})

mongoose.exports = mongoose.model("user", ownerSchema);