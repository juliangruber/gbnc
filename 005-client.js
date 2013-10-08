var shoe = require('shoe');
var levelup = require('levelup');
var leveljs = require('level-js');
var levelfs = require('level-fs');
var container = require('container-el');
var domStream = require('./lib/dom-stream');
var tee = require('tee-1');

var db = levelup('db', { db: leveljs });
db.on('open', function() { db.db.idb.clear() });
var fs = levelfs(db);

window.db = db;
window.fs = fs;

shoe('/shoe').pipe(tee(
  fs.createWriteStream('foo/bar/file.txt'), // yes!
  domStream(container)
));

