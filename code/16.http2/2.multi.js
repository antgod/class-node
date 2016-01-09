var http = require('http');
var url = require('url');
var fs = require('fs');
var agentUtil = require('user-agent-parser');
/**
 * 从一个网页跳转，或者网页引用一个资源的时候，
 * HTTP请求的会带有refer表示来源网页的URL
 *
 */
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    console.dir(agentUtil(req.headers['user-agent']));
    var pathname = urlObj.pathname;
    //Accept-Language:zh-CN,zh;q=0.8
    if(pathname == '/favicon.ico'){
        return res.end('404');
    }
    if(pathname =='/'){
        var accept = req.headers['accept-language'];
        var langs = accept.toLowerCase().split(',').map(function(item){
            var s = item.split(';');
            var lan = s[0];
            var q = s[1]|| 'q=1';
            if(q.substr(0,2)=='q='){
                q = Number(q.substr(2));
            }else{
                q = 0;
            }
            return {lan:lan,q:q};
        }).sort(function(a,b){
            return b.q - a.q;// [{lan:'zh-cn',q:1},{lan:'zh',q:0.8}]
        });
        var mylangs = ['en','zh'];
        var defaultLan = null;
        //[{lan:'zh-cn',q:1},{lan:'zh',q:0.8}]
        for(var i=0;i<langs.length;i++){
            if(mylangs.indexOf(langs[i]['lan'])>-1){
                defaultLan = langs[i]['lan'];
                break;
            }
        }
        fs.createReadStream('./img_'+defaultLan+'.html').pipe(res);
    }

}).listen(8080);