var http = require('http');
var ecstatic = require('ecstatic');
var shoe = require('shoe');
var fs = require('fs');
var MuxDemux = require('mux-demux');
var throttle = require('throttle');
var toString = require('./lib/tostring');

var server = http.createServer(ecstatic(__dirname));
server.listen(8000);

var sock = shoe(function(con) {
  var mdm = MuxDemux();
  mdm.on('connection', function(con) {
    if (con.meta == 'random') {
      fs.createReadStream('/dev/urandom')
      .pipe(throttle(100))
      .pipe(toString())
      .pipe(con);
    }
  });
  con.pipe(mdm).pipe(con);
});
sock.install(server, '/shoe');

