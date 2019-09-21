//use strict is implicit in module

const mongoose = require('mongoose');
mongoose.Promise = Promise

mongoose.connect(process.env.DB_URL , {useNewUrlParser: true}).then(() => {
  console.log('Connected successfully.');
}, err => {
  console.log('Connection to db failed: ' + err);
});

module.exports = mongoose.connection;