var http = require('http');
var ecstatic = require('ecstatic');
var shoe = require('shoe');
var fs = require('fs');
var MuxDemux = require('mux-demux/jsonb');
var through = require('through');
var toString = require('./lib/tostring');

var server = http.createServer(ecstatic(__dirname));
server.listen(8000);

var sock = shoe(function(con) {
  var mdm = MuxDemux();

  fs.createReadStream(__dirname + '/file.txt')
  .pipe(toString())
  .pipe(mdm.createWriteStream('foo/bar/file.txt'));

  fs.createReadStream(__dirname + '/lyrics.txt')
  .pipe(toString())
  .pipe(mdm.createWriteStream('some/lyrics.txt'));

  con.pipe(mdm).pipe(con);
});
sock.install(server, '/shoe');
