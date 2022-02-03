'use strict';

const util = require('util');
const internalUtil = require('./internal/util');
const EventEmitter = require('events');


exports.IncomingMessage = require('_http_incoming').IncomingMessage;//获得输入流对象


const common = require('_http_common');                             //工具包
exports.METHODS = common.methods.slice().sort();


exports.OutgoingMessage = require('_http_outgoing').OutgoingMessage; //获得输出流对象


const server = require('_http_server');
exports.ServerResponse = server.ServerResponse;                      //导出server对象
exports.STATUS_CODES = server.STATUS_CODES;


const agent = require('_http_agent');
const Agent = exports.Agent = agent.Agent;                           //导出代理对象
exports.globalAgent = agent.globalAgent;

const client = require('_http_client');                              //导出client对象
const ClientRequest = exports.ClientRequest = client.ClientRequest;

exports.request = function(options, cb) {                            //request时,导出ClientRequest对象
  return new ClientRequest(options, cb);
};

exports.get = function(options, cb) {                                //get函数不用主动调用end
  var req = exports.request(options, cb);
  req.end();
  return req;
};

exports._connectionListener = server._connectionListener;            //导出连接监听器
const Server = exports.Server = server.Server;

exports.createServer = function(requestListener) {                   //创建server,传入requestListener(回调函数),创建server对象
  return new Server(requestListener);
};


// Legacy Interface:遗产接口,已弃用
function Client(port, host) {
  //如果直接调用,实例化
  if (!(this instanceof Client)) return new Client(port, host);
  EventEmitter.call(this);

  //默认监听本地80端口
  host = host || 'localhost';
  port = port || 80;
  this.host = host;
  this.port = port;
  //创建新的代理实例
  this.agent = new Agent({ host: host, port: port, maxSockets: 1 });
}
util.inherits(Client, EventEmitter);
Client.prototype.request = function(method, path, headers) {
  //拼接参数
  var self = this;
  var options = {};
  options.host = self.host;
  options.port = self.port;
  if (method[0] === '/') {
    headers = path;
    path = method;
    method = 'GET';
  }
  options.method = method;
  options.path = path;
  options.headers = headers;
  options.agent = self.agent;
  //创建ClientRequest对象
  var c = new ClientRequest(options);

  //如果创建失败
  c.on('error', function(e) {
    self.emit('error', e);       //参考_http_client socketErrorListener
  });
  // The old Client interface emitted 'end' on socket end.
  // This doesn't map to how we want things to operate in the future
  // but it will get removed when we remove this legacy interface.
  c.on('socket', function(s) {          //当连接socket时:参考_http_client tickOnSocket函数,追踪:创建ClientRequest时候调用
    s.on('end', function() {            //当socket结束时(Stream end),发射data和end事件
      if (self._decoder) {
        var ret = self._decoder.end();
        if (ret)
          self.emit('data', ret);
      }
      self.emit('end');
    });
  });
  return c;
};


//打印出:此函数已经弃用
exports.Client = internalUtil.deprecate(Client, 'http.Client is deprecated.');          //柯里化,返回一个Client函数包装层

//打印出http.createClient已弃用.使用http.request代替
exports.createClient = internalUtil.deprecate(function(port, host) {
  return new Client(port, host);                                                        //调用包装层
}, 'http.createClient is deprecated. Use http.request instead.');
