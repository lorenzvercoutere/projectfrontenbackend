/**
 * Created by lorenzvercoutere on 4/01/17.
 */


var User = require("../../data/models/user");
var mongoDB = require('mongodb');
var mongoClient = mongoDB.MongoClient;

var url = 'mongodb://localhost:27017/sharkfrenzy';


function connectToDb(){
    //alert("login");
    console.log("Connecting to db...");
    console.log(mongoDB);

    mongoClient.connect(url, function (err, db) {
        if(err){
            console.log('Unable to connect to mongoDb server. Error: ' + err);
        }
        else {
            console.log('Connection established to', url);
            login();
        }
    });
}

function login() {
    var txtUsername = document.getElementById("loginUsername");
    var username = txtUsername.value;

    console.log("Gebruikersnaam: " + username);

    var database = db.collection("users");
    var collection = database.find({username: username});
    //var gebruikers = new Array();

    console.log("collectie: " + collection);
}