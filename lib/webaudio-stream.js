var through = require('through');
var webaudio = require('webaudio');

module.exports = webaudioStream;

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

