var mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
// const mongodb = require('mongodb');
const dateformat = require('dateformat');
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
mongoose.set('useCreateIndex', true);
let Menu = mongoose.model('Menu',{
      _id: mongoose.Schema.Types.ObjectId,
      // menu_id:{ type: String, required: true },
      dish_name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true},
      section: { type: String, required: true},
      restaurant_name: { type: String, required: true },
      restaurant_zipcode: { type: Number, required: true },
      image:{ type: String },
      created: { type: Date, default: today },
      modified: { type: Date, default: today }      
    })

module.exports = Menu;