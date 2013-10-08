var http = require('http');
var ecstatic = require('ecstatic');
var shoe = require('shoe');
var fs = require('fs');
var MuxDemux = require('mux-demux');
var toString = require('./lib/tostring');
var throttle = require('throttle');
var through = require('through');

var server = http.createServer(ecstatic(__dirname));
server.listen(8000);

var sock = shoe(function(con) {
  var mdm = MuxDemux();

  fs.createReadStream('/dev/urandom')
  .pipe(throttle(100))
  .pipe(toString())
  .pipe(mdm.createWriteStream('random'));

  con.pipe(mdm).pipe(con);
});
sock.install(server, '/shoe');

