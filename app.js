const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const team = require('./routes/team');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const inDev = false;
if (inDev) {
  mongoose.connect('mongodb://localhost/bookadoweb', { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));
} else {
  mongoose.connect('mongodb://web-app:admin1234@ds147411.mlab.com:47411/bookado', { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));
}
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/getTeam', team);
app.use('/', express.static(path.join(__dirname, 'dist/bookadoweb/')));
app.use('*', express.static(path.join(__dirname, 'dist/bookadoweb/')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
