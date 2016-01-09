/**
 *domain帮我们正确优雅的处理异常
 */
var domain = require('domain');
var http = require('http');
http.createServer(function(req,res){
 var monitor = domain.create();
 monitor.once('error',function(err){
        res.end('客官，我们挂了,请稍后再来');
 });
 monitor.run(function(){
        error();
 });
}).listen(8080);