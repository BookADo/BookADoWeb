const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();



// [SH] Bring in the data model
require('./api/models/db');
require('./api/config/passport');
const team = require('./api/routes/team');

// [SH] Bring in the routes for the API (delete the default routes)
const routesApi = require('./api/routes/index');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/getTeam', team);

app.use(passport.initialize());
// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);
app.use('/', express.static(path.join(__dirname, 'dist/bookadoweb/')));
app.use('*', express.static(path.join(__dirname, 'dist/bookadoweb/')));

// [SH] Initialise Passport before using the route middleware



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

app.listen(80, function () {
  console.log('Server listening on port 80...');
});


module.exports = app;
