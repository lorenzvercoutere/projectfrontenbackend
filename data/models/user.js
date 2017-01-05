/**
 * Created by lorenzvercoutere on 2/01/17.
 */


var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema, "users");

User.getUsers = function (callback) {
    User.find({}).exec(function (err, doc) {
       if(err) { console.log(err); }
       callback(doc);
    });
};



module.exports = User;