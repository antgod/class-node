
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
/**
 * req http.IncomingMessage 请求 流对象
 * res http.ServerResponse 响应 流对象
 */
var server = http.createServer(function(req,res){
    req.on('data',function(chunk){
        console.log(chunk.toString());
    });
    res.end('server is ok');
}).listen(8080,function(){
    console.log('server started');
});

server.on('connection',function(socket){
    socket.name='du';
    console.log('connected');
});

server.on('close',function(){
    console.log('close');
});

server.on('error',function(err){
    console.error(err);
});


/*
server.setTimeout(3000,function(socket){
    console.log('超时了');
    socket.destroy();
    if(socket.name == 'du'){
        server.unref();
    }
});
*/
