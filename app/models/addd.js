var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
name:{ type: String,required: true},
sitem:{ type: String,required: true}
});

module.exports = mongoose.model('AddDetails',UserSchema);
