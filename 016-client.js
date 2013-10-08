var shoe = require('shoe');
var levelup = require('levelup');
var leveljs = require('level-js');
var levelfs = require('level-fs');
var container = require('container-el');
var domStream = require('./lib/dom-stream');
var tee = require('tee-1');
var MuxDemux = require('mux-demux');
var webaudio = require('webaudio');
var through = require('through');

var db = levelup('db', { db: leveljs });
db.on('open', function() { db.db.idb.clear() });
var fs = levelfs(db);

window.db = db;
window.fs = fs;

var mdm = MuxDemux();

mdm.createReadStream('random')
.pipe(through(function(buf) {
  this.queue(buf
  .split('')
  .map(function(c) {
    var n = (255/2 - c.charCodeAt(0))/255;
    n = Math.min(n, 1);
    n = Math.max(n, -1);
    return n;
  }));
}))
.pipe(webaudioStream());

mdm.pipe(shoe('/shoe')).pipe(mdm);

function webaudioStream() {
  var buf = [];

  var channel = webaudio(function(time) {
    if (!buf.length) return Math.random();
    return buf.shift();
  });
  channel.play();
  return through(write);

  function write(chunk) {
    buf = buf.concat(chunk);
    if (buf.length > 1000) return false;
  }
}

