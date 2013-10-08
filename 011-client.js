var shoe = require('shoe');
var levelup = require('levelup');
var leveljs = require('level-js');
var levelfs = require('level-fs');
var container = require('container-el');
var domStream = require('./lib/dom-stream');
var tee = require('tee-1');
var MuxDemux = require('mux-demux');

var db = levelup('db', { db: leveljs });
var fs = levelfs(db);

window.db = db;
window.fs = fs;

var mdm = MuxDemux();

mdm.on('connection', function(con) {
  var path = con.meta;

  con.pipe(tee(
    fs.createWriteStream(path, { flag: 'a' }), // yes!
    domStream(container)
  ));
});

mdm.pipe(shoe('/shoe')).pipe(mdm);

