var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
vidtype:{ type: String,required: true}
});

module.exports = mongoose.model('vidtypDetails',UserSchema);
