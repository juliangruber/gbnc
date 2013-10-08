var shoe = require('shoe');
var levelup = require('levelup');
var leveljs = require('level-js');
var levelfs = require('level-fs');
var container = require('container-el');
var domStream = require('./lib/dom-stream');
var tee = require('tee-1');
var MuxDemux = require('mux-demux');
var bufToAudioStream = require('./lib/buf-to-audio');
var webaudioStream = require('./lib/webaudio-stream');

var db = levelup('db', { db: leveljs });
db.on('open', function() { db.db.idb.clear() });
var fs = levelfs(db);

window.db = db;
window.fs = fs;

var mdm = MuxDemux();

mdm.createReadStream('random')
.pipe(bufToAudioStream())
.pipe(tee(
  fs.createWriteStream('recording', { flag: 'a' }),
  webaudioStream()
));

mdm.pipe(shoe('/shoe')).pipe(mdm);

