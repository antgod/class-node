var http = require('http');
http.createServer(function(req,res){
    res.end('3');
}).listen(8080);