1. git 搜索nodejs

2. /t 查找http模块

3. get请求函数,对request封装
exports.get = function(options, cb) {
  var req = exports.request(options, cb);
  req.end();
  return req;
};

4. request函数,返回ClientRequest函数
exports.request = function(options, cb) {
  return new ClientRequest(options, cb);
};

5. ClientRequest来自与_http_client模块,request对应_http_client模块下面的 ClientRequest 函数

6. createServer创建了一个新的Server实例,server来自于_http_server
var server = require('_http_server');
exports.ServerResponse = server.ServerResponse;

exports._connectionListener = server._connectionListener;
var Server = exports.Server = server.Server;

exports.createServer = function(requestListener) {
    return new Server(requestListener);
};

7. _http_server函数添加事件:request,触发回调函数

function Server(requestListener) {
    if (!(this instanceof Server)) return new Server(requestListener);
    net.Server.call(this, { allowHalfOpen: true });

    if (requestListener) {
        this.addListener('request', requestListener);
    }