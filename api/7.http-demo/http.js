var http=require('http');


var server=http.createServer(function(req,res){
    res.writeHead("200",{'content-type':'text/plain'});
    res.write('Hello Nodejs');
    res.end();
});

server.listen(8080);