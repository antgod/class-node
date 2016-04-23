// npm install -g node-inspector
// node-inspector &
// node --debug-brk inspector.js
// http://localhost:8080/debug?port=5858
var http = require('http');

var server=http.createServer(function(req,res){
    debugger;
    console.log(req.url);

    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.end('页面加载完毕');
});

server.listen(3001);