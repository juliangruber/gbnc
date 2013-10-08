var http = require('http');
var ecstatic = require('ecstatic');
var shoe = require('shoe');
var fs = require('fs');

var server = http.createServer(ecstatic(__dirname));
server.listen(8000);

var sock = shoe(function(con) {
  fs.createReadStream(__dirname + '/file.txt').pipe(con);
});
sock.install(server, '/shoe');
