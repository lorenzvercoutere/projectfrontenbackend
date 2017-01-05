/**
 * Created by lorenzvercoutere on 2/01/17.
 */


var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type:String, required: true},
    coins: {type:Number},
    activeShark: {type:String}
});

module.exports = UserSchema;