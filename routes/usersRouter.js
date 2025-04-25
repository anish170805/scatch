const express = require('express');
const router = express.Router();
const {registeredUser} = require("../controllers/authController");
const {loginUser} = require('../controllers/authController');
const {logout} = require('../controllers/authController');

router.get('/', (req,res)=>{
    res.send('hey');
})

router.post('/register',registeredUser );
router.post('/login', loginUser);

router.get('/logout', logout);

module.exports = router;