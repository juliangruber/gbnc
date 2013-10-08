var shoe = require('shoe');
var levelup = require('levelup');
var leveljs = require('level-js');
var Store = require('level-store');
var container = require('container-el');
var domStream = require('../lib/dom-stream');
var tee = require('tee-1');

var db = levelup('db', { db: leveljs });
var store = Store(db);

window.db = db;
window.store = store;

shoe('/shoe').pipe(tee(
  store.createWriteStream('file'),
  domStream(container)
));

