/**
 *
 **/

var http = require('http');
var domain = require('domain');
http.createServer(function(req,res){
    var d = domain.create();
    d.add(req);
    d.add(res);
    d.remove(req);
    d.on('error',function(err){
        res.writeHead(200);
        res.end(err.message);
    });
    req.on('data',function(data){
        //error();
        res.end('hello');
    });
}).listen(8080);