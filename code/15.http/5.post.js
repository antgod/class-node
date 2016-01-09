var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    req.method = urlObj.query.__method__;
    console.log(req.method);
    if(pathname =='/'){
        fs.createReadStream('./post.html').pipe(res);
    }else if(pathname =='/post'){
        res.write(url.parse(req.url).query);
        var postData = '';
        req.on('data',function(chunk){
            postData+=chunk.toString();
        });
        req.on('end',function(){
            console.log('接收完毕了');
            res.end(postData);
        });
    }

}).listen(8080);