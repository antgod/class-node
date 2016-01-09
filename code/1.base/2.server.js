/**
 * Created by lihongji on 2015/6/27.
 */


var http=require("http");

var server=http.createServer(waiter);

function waiter(req,rsp){
    rsp.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    var url=req.url;

    var a=url.split("?");
    var pathname=a[0];
    var paramsObj={};
    if(url.indexOf("?")>-1){
        var params= a[1];
        params=params.split("&");
        for(var i in params){
            var param=params[i];
            param=param.split("=");
            paramsObj[param[0]]= param[1];
        }
    }
    if(pathname=="/menu"){
        rsp.end("<ul><li><a href='/chicken?"+a[1]+"' >黄焖鸡</a></li><li><a href='/leg'>鸡腿饭</a></li></ul>");
    }else if(pathname=="/leg"){
        rsp.end("鸡腿饭");
    }else if(pathname=="/chicken"){
        rsp.end("黄焖鸡"+paramsObj["num"]+"份");
    }else{
        rsp.end(pathname);
    }
}

server.listen(8080,"localhost");
