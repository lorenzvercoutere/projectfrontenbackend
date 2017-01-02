/**
 * Created by Student on 02-Jan-17.
 */
var static = require("node-static"),
    config = require("./config.js"),
    port = process.env.port || config.PORT;

var fileServer = new static.Server('./public', {
    cache: 0,
    gzip: true
});

var app = require('http').createServer(function (req, res) {
    req.addListener('end', function () {
        fileServer.serve(req, res);
    }).resume();
});


app.listen(port);

var io = require("socket.io").listen(app);
console.log("server en sockets luisteren naar poort: " + port);

require("./wwwroot/js/sockets.js")(io);
