var IncomingMessage = require('_http_incoming').IncomingMessage;

var OutgoingMessage = require('_http_outgoing').OutgoingMessage;

var fs = require('fs');

var readStream=fs.createReadStream("http.js");



//console.log('IncomingMessage',IncomingMessage,'readStream',readStream);


var incomingMessage=new IncomingMessage();

console.log(incomingMessage);
