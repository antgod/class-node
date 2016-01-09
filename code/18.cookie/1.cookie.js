/**
 * cookie 是WEB服务器发送给用户的一段文本
 * 浏览器收到cookie后，会把cookie信息以key-value的形式保存在本地
 * 再次请求的时候，浏览器会把此前保存的cookie重新发给服务器端
 *
 */

/**
 * Set-Cookie: name=zfpx; path=/a; domain=xx
 * name 名称
 * value 值
 * domain 指定cookie被发送到哪台服务器上
 * path 控制哪些路径 可以发送cookie path=/
 * expires 过期时间 指定 cookie的失效时间，
 * max-age 最大存活时间
 * size 大小
 * http 只允许HTTP访问，不允许js进行访问
 * secure
 */

var url = require('url');
var http = require('http');
var cookieUtils = require('./cookieUtils');
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname=='/favicon.ico'){
        res.writeHead(404);
        res.end(http.STATUS_CODES[404]);
    }else if(pathname == '/write'){
        res.writeHead(200,{
            "Content-Type":"text/html;charset=utf8",
            "Set-Cookie":[cookieUtils.serialize('name','zfpx',{path:'/read',httpOnly:true,expires:new Date(new Date().getTime()+30*1000)}),
                cookieUtils.serialize('age',6,{path:'/read',httpOnly:true,maxAge:10})]
        });
        res.end('成功写入cookie');
    }else{
        res.end(req.headers.cookie);
    }
}).listen(8080);