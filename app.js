const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const flash = require('connect-flash');
const expressSession = require('express-session');


require("dotenv").config();
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter');
const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  expressSession({
    resave : false,
    saveUninitialized: false,
    secret : process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use("/", indexRouter)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);

app.use("/products", productRouter);

app.get('/logout', (req, res) => {
  res.redirect('/users/logout');
});



const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please free the port or use a different one.`);
  } else {
    console.error('Server error:', error);
  }
});

