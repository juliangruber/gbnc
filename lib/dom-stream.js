var through = require('through');

module.exports = function domStream(el) {
  var tr = through(write);
  tr.readable = false;
  return tr;

  function write(chunk) {
    el.innerHTML += chunk.toString();
  };
}

