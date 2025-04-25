const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const secretKey = process.env.JWT_KEY || 'default_secret_key';
    return jwt.sign({ email: user.email, id: user._id }, secretKey);
};

module.exports.generateToken = generateToken;
