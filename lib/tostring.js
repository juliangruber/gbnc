var through = require('through');

module.exports = toString;

function toString(){
  return through(function(d){
    this.queue(d.toString());
  })
}
