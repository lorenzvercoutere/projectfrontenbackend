/**
 * Created by lorenzvercoutere on 2/01/17.
 */


var config = require('../config');
var app = require('../app');

var http = require('http');
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);

var DBService = require('../data/connectDBService');
var connectDB = DBService ('mongodb://sharkfrenzy:team123@ds117199.mlab.com:17199/sharkfrenzy', require('mongoose'));

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' +server.address().address + ":" + app.get('port'));
});

/*var server = app.listen(app.get('port'), function () {
    //debug('Express server listening on port ' + server.address().port);
});*/

var io = require('socket.io').listen(server);


//var sockets = io.listen(server);
console.log("io luistert naar " + app.get('port'));

require("../sockets.js")(io);