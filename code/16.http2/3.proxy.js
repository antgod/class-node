var http = require('http');
var url = require('url');
var fs = require('fs');
var httpProxy = require('http-proxy');
var forward = require('forwarded');
//   a.zfpx.com www.baidu.com
/**
 * 实现一个端口监听多个域名
 */
var proxyServer = {
    "a.zfpx.com": "www.baidu.com",
    "b.zfpx.com": "www.163.com"
}
var server = http.createServer(function (req, res) {
    var host = url.parse(req.url, true).host;
    var proxy = httpProxy.createProxyServer();
    proxy.on('proxyReq',function(proxyReq,req,res,options){
        proxyReq.setHeader('Host','www.baidu.com');
        proxyReq.setHeader('X-Real-IP',forward(req));
    });
    proxy.on('proxyRes', function (proxyRes, req, res) {
        res.setHeader('X-Proxy-By', 'proxy by');
    });

    proxy.on('error', function (err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>错了</h1><pre>' + err.stack + '</pre>');
    });
    proxy.web(req, res, {target: 'http://www.baidu.com/'});
}).listen(80);