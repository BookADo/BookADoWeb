require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

if (process.env.ENV=='dev') {
  mongoose.connect('mongodb://localhost/bookadoweb', { useMongoClient: false, promiseLibrary: require('bluebird') })
    .then(() =>  console.log('local connection successful'))
    .catch((err) => console.error(err));
} else if (process.env.ENV=='prod'){
  mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds147411.mlab.com:47411/bookado', { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() =>  console.log('prod connection successful'))
    .catch((err) => console.error(err));
}
require('./Users');
require('./Team');
