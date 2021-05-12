const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const recipesRouter = require('./routes/recipes');
const apiRecipes = require('./routes/api-recipes');

require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.bu9jf.mongodb.net/testDB?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
	console.log('Database connected from app.js!!');
})
.catch((err) => { 
	console.error(`Database Connection Error from app.js: ${err}`); 
	process.exit();
});


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routers
app.use('/recipes', recipesRouter);
app.use('/api/recipes', apiRecipes);


app.use('/', (req, res) => {
   
   var pattern = new RegExp('(.css|.html|.js|.ico|.jpg|.png)+\/?$', 'gi'); 
   if (pattern.test(req.url)) {
      let url = req.url.replace(/\/$/, "");
      res.sendFile(path.resolve(__dirname, `../client/dist/${url}`));
   } else {
      res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
   }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

