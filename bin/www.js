/**
 * Created by lorenzvercoutere on 2/01/17.
 */


var config = require('../config');
var app = require('../app');

var http = require('http');
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);

var DBService = require('../data/connectDBService');
var connectDB = DBService (config.MONGODBURL, require('mongoose'));


server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' +server.address().address + ":" + app.get('port'));
});

/**var User = require('../data/models/user');

var mongoDB = require('mongodb');
var mongoClient = mongoDB.MongoClient;

var url = 'mongodb://localhost:27017/sharkfrenzy';

function init() {

    console.log("Hallo initializing db");

    mongoClient.connect(url, function (err, db) {
        if(err){
            console.log('Unable to connect to mongoDb server. Error: ' + err);
        }
        else {
            console.log('Connection established to', url);
        }

        var database = db.collection("users");
        var collection = database.find({});
        var gebruikers = new Array();


        collection.each(function (err, doc) {
            if(doc != null) {
                console.log('user: ' + doc.username);
                var gebruiker = new User(doc);
                console.log(gebruiker.username);
                gebruikers.push(gebruiker);
            }
        });
        //console.log("Gebruiker: ", collection);
        setTimeout(function () {
            console.log('size of array: ' + gebruikers.length);
        }, 500);

        db.close();
    });
}

init();**/
