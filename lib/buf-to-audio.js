var through = require('through');

module.exports = function() {
  return through(function(buf) {
    this.queue(buf
    .split('')
    .map(function(c) {
      var n = (255/2 - c.charCodeAt(0))/255;
      n = Math.min(n, 1);
      n = Math.max(n, -1);
      return n;
    }));
  });
};

