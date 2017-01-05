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

router.get('/details?:username', function (req, res) {
    //console.log("details laden : "  + req.query.username);


    //console.log('user: ' + req.user);
    res.render('details', {username: req.query.username});
});

module.exports = router;