//use strict is implicit in module

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    address: String,
    date: Date,
    menu: String,
    note: String
  });

module.exports = mongoose.model('Restaurant',restaurantSchema);