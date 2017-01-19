var express = require('express');
var router = express.Router();

var User = require('../data/models/user');
var loadUser = require('./middleware/load_user'); //ophalen van één user

router.get('/', function (req, res) {
    //zonder repository:
    //User.find({}).sort('username').exec(function (err, docs) {
    //    res.render('users/index', { title: 'Users overzicht', userlist: docs });
    //}

    //met repository in het model:
    /*User.getUsers(function (users) {
        console.log("users: " + users);
        res.render('index');
    });*/

    res.render('index');

    //console.log("username: " + req.params.username);

    //met afzonderlijk repository:
    //UsersRepo = require("../data/models/usersRepo");
    //UsersRepo.getAllUsers(function (users) {
    //    res.render('users/index', { title: 'Users overzicht', userlist: users });
    //});

});

router.get('/logout', function (req, res) {
    res.redirect('/');
});


router.post('/login', function (req, res) {
    var username = JSON.stringify(req.body.username).slice(1, -1);
    console.log("this is the username: " + username);

    if(username == ""){

    }
    else{
        User.find({'username': username}).exec(function (err, player) {
            /*if(player.length > 0){
                console.log("Username exists");
                //code wanneer de speler inlogt

            }else{
                console.log("Making new user...");
                //de user aanmaken
                var user = {
                    username: username,
                    coins: 0,
                    activeShark: "grey"
                };

                var data = new User(user);
                data.save();
            }*/
            if(err){
                //nieuwe user aanmaken;
                var user = {
                    username: username,
                    coins: 0,
                    activeShark: "grey"
                };

                var data = new User(user);
                data.save();
            }
            else{
                console.log("gebruiker bestaat");
                //res.redirect("/");
            }
        });
    }


});

router.get('/shop', function (req, res) {
    res.render('shop');
});

router.get('/howto', function (req, res) {
    res.render('howto');
});

router.get('/details?:username', function (req, res) {
    //console.log("details laden : "  + req.query.username);


    //console.log('user: ' + req.user);
    res.render('details', {username: req.query.username});
});

module.exports = router;