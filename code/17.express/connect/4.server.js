var http = require('http');
var url = require('url');
var fs = require('fs');
var connect = require('./connect');
var DATA = {
    "1":"<h1>这是第一篇</h1>",
    "2":"<h1>这是第二篇</h1>",
    "3":"<h1>这是第三篇</h1>",
    "4":"<h1>这是第四篇</h1>"
}
function getData(id){
    return DATA[id];
}
var app = connect();
//增加一个send 100 中央
app.use(function(req,res,next){
    var urlObj = url.parse(req.url,true);
    req.pathname = urlObj.pathname;
    req.query = urlObj.query;
    res.send = function(content){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
        res.end(content);
    }
    next();
});
app.use('/list',function(req,res,next){
    console.log('in /');
        var all = '<ul>';
        for(var attr in DATA){
            all += '<li><a href="/item?name='+attr+'">文章'+attr+'</a></li>'
        }
        all+='</ul>';
         res.send(all);
});
app.use('/item',function(req,res,next){
    console.log('in /item');
        res.send(getData(req.query.name));
});

http.createServer(app).listen(8080);