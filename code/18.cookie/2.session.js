/**
 * session会话
 **/
var http = require('http');
var url = require('url');
var cookieUtils = require('./cookieUtils');
var SESSION_KEY = 'zfkey';
var EXPIRE_TIME = 10*1000;
var session = {};
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    var now = new Date().getTime();
    if(pathname == '/favicon.ico'){
        res.end('404');
    }else{
         var cookieObj = cookieUtils.parse(req.headers.cookie);
        if(cookieObj[SESSION_KEY]){
            var sessionId = cookieObj[SESSION_KEY];
            var sessionObj =  session[sessionId];
            if(!sessionObj || !(sessionObj.expTime)|| sessionObj.expTime.getTime()<now){
                var sessionObj = {mny:100,expTime:new Date(now+EXPIRE_TIME)};
                var sessionId = now+"_"+Math.random();
                session[sessionId] = sessionObj;
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8",
                    "Set-Cookie":cookieUtils.serialize(SESSION_KEY,sessionId)});
                res.end('欢迎老朋友，但你的卡已经到期了，我换张新卡给你，你的余额是'+sessionObj.mny);
            }else{
                if(sessionObj.mny<=0){
                    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                    res.end('你没钱了，你来的太勤了，待会再来吧'+sessionObj.mny);
                }else{
                    sessionObj.expTime = new Date(now+EXPIRE_TIME);
                    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                    sessionObj.mny -=20;
                    res.end('欢迎老朋友,你的余额已经变成了'+sessionObj.mny);
                }

            }
        }else{
            var sessionObj = {mny:100,expTime:new Date(now+EXPIRE_TIME)};
            var sessionId = now+"_"+Math.random();
            session[sessionId] = sessionObj;
            res.writeHead(200, {"Content-Type":"text/html;charset=utf8",
            "Set-Cookie":cookieUtils.serialize(SESSION_KEY,sessionId)});
            res.end('欢迎新朋友，你的余额是'+sessionObj.mny);
        }
    }

}).listen(8080);