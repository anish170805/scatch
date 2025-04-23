const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./config/mongoose-connection');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter');

app.use(express.json());
app.use(express.urlencoded({Extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');


app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);


app.get('/', (req, res) => {
     res.render('index'); 
})

app.listen(3000);

