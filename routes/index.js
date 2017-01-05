/**
 * Created by lorenzvercoutere on 5/01/17.
 */


var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/users');
});

module.exports = router;