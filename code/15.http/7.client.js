

var http = require('http');
var options = {
    host:'localhost',
    port:8080,
    path:'/',
    method:'GET'
}

var req = http.request(options,function(res){
    console.log(res.statusCode);
    console.dir(res.headers);
 res.on('data',function(chunk){
     console.log("响应的内容是"+chunk);
 });
});
req.write('client is ok');
req.write('client is ok');
req.end();