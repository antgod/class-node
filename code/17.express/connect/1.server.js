var http = require('http');
var url = require('url');
var fs = require('fs');
var DATA = {
    "1":"<h1>这是第一篇</h1>",
    "2":"<h1>这是第二篇</h1>",
    "3":"<h1>这是第三篇</h1>",
    "4":"<h1>这是第四篇</h1>"
}
function getData(id){
    return DATA[id];
}
http.createServer(function(req,res){
    var urlObject = url.parse(req.url, true);
    var pathname = urlObject.pathname;
    if(pathname =='/favicon.ico'){
        fs.createReadStream('./favicon.ico').pipe(res);
    }
    if(pathname == '/'){
        var all = '<ul>';
        for(var attr in DATA){
            all += '<li><a href="/item?name='+attr+'">文章'+attr+'</a></li>'
        }
        all+='</ul>';
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
        res.end(all);
    }else if(pathname == '/item'){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
        res.end(getData(urlObject.query.name));
    }
}).listen(8080);