var shoe = require('shoe');
var levelup = require('levelup');
var leveljs = require('level-js');
var levelfs = require('level-fs');
var container = require('container-el');
var domStream = require('./lib/dom-stream');
var tee = require('tee-1');
var MuxDemux = require('mux-demux/jsonb');

var db = levelup('db', { db: leveljs });
db.on('open', function() { db.db.idb.clear() });
var fs = levelfs(db);

window.db = db;
window.fs = fs;

var mdm = MuxDemux();

mdm.on('connection', function(con) {
  var path = con.meta;

  con.pipe(tee(
    fs.createWriteStream(path), // yes!
    domStream(container)
  ));
});

mdm.pipe(shoe('/shoe')).pipe(mdm);

