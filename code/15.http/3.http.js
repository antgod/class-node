/**
 * 业务逻辑分发
 */
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req,res){
    //handler['article']['add']
    //  xxxx:8080/article/add/:title/:content
    //  xxxx:8080/article/delete/:id
  var pathname = url.parse(req.url).pathname;
  var paths =  pathname.split('/');
  var handler = require('./'+paths[1]);
  for(var i=2;i<paths.length;i++){
        if(handler[paths[i]]){
            handler=handler[paths[i]];
            if(typeof handler =='function'){
                handler.apply(null,[req,res,paths.slice(i)]);
                break;
            }
        }else{
            res.end('404');
            break;
        }
    }
}).listen(8080);
