var http = require('http');
var url = require('url');
var fs = require('fs');
/**
 * 从一个网页跳转，或者网页引用一个资源的时候，
 * HTTP请求的会带有refer表示来源网页的URL
 *
 */
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname =='/'){
        fs.createReadStream('./img.html').pipe(res);
    }else if(pathname =='/logo.jpg'){
        var referer = req.headers['referer'];
        if (referer){
            var host = url.parse(referer).host.split(':')[0];
            if(host == 'b.zfpx.com'){
                fs.createReadStream('./no.jpg').pipe(res);
                return;
            }
        }
        fs.createReadStream('./logo.jpg').pipe(res);
    }

}).listen(8080);