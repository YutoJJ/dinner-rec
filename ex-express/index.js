
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/test').then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.port);

}, err => {
  console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
    res.send(`Hello`);

});

app.listen(3000);