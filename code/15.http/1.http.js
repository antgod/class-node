
var http = require('http');
var url = require('url');
var querystring = require('querystring');
/**
 * req http.IncomingMessage 请求 流对象
 * res http.ServerResponse 响应 流对象
 */
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    //console.dir(urlObj);
   // console.dir(req.headers);
    console.log(req.url,req.method);
    //console.log(req.headers['host']);
    res.statusCode =  200;
    res.setHeader('name','zfpx');
    res.setHeader('age','6');
  res.end('404');
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


server.setTimeout(3000,function(socket){
    console.log('超时了');
    socket.destroy();
    if(socket.name == 'du'){
        server.unref();
    }
});
