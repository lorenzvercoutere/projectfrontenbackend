/**
 * Created by lorenzvercoutere on 2/01/17.
 */


var config = require('../config');

var DBService = require('../data/connectDBService');
var connectDB = DBService (config.MONGODBURL, require('mongoose'));