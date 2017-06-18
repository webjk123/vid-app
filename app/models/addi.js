var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');

var addiSchema = new Schema({
imgpath:{ type: String, lowercase: true, unique: true},
vlink:{ type: String, required: true},
sitem:{ type: String,lowercase: true},
piccaption:{ type: String,lowercase: true, unique: true}
});

module.exports = mongoose.model('Addi',addiSchema);
