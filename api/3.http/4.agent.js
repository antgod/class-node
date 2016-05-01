//http.Agent
//HTTP Agent 用于 socket 池，用于 HTTP 客户端请求。
//HTTP Agent 也把客户端请求默认为使用 Connection:keep-alive 。如果没有 HTTP 请求正在等着成为空闲 socket
//的话，那么 socket 将关闭。这意味着，Node 的资源池在负载的情况下对 keep-alive 有利，但是仍然不需要开发人员使
//用 KeepAlive 来手动关闭 HTTP 客户端。
//
//如果你选择使用 HTTP KeepAlive， 可以创建一个 Agent 对象，将 flag 设置为 true. (参见下面的 constructor
//options ) ，这样 Agent 会把没用到的 socket 放到池里，以便将来使用。他们会被显式的标志，让 Node 不运行。但是
//，当不再使用它的时候，需要显式的调用destroy()，这样 socket 将会被关闭。
//
//当 socket 事件触发 close 事件或特殊的 agentRemove 事件时，socket 将会从 agent 池里移除。如果你要保持 HTTP
//请求保持长时间打开，并且不希望他们在池里，可以参考以下代码：

var http=require('http');
var options={
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
        "Expect":"100-continue" //post请求必须带有此选项,才会继续发送请求体
    }
};



//http.get(options, function(res) {
//    console.log('请求响应');
//}).on("socket", function (socket) {
//    console.log('socket');
//    socket.emit("agentRemove");
//});
//
//http.get(options, function(res) {
//    console.log('请求响应');
//}).on("socket", function (socket) {
//    console.log('socket');
//    socket.emit("agentRemove");
//});


//http.get({
//    hostname: 'localhost',
//    port: 5000,
//    Connection:"keep-alive",
//    agent: false  // create a new agent just for this one request
//}, function (res) {
//    // Do stuff with response
//    res.on('data', function (chunk) {
//        console.log('BODY: ' + chunk);
//    });
//}).on("socket", function (socket) {
//    console.log('socket');
//});
//
//http.get({
//    hostname: 'localhost',
//    port: 5000,
//    agent: false,  // create a new agent just for this one request,
//    headers: {
//        Connection:"keep-alive"
//    }
//}, function (res) {
//    // Do stuff with response
//    res.on('data', function (chunk) {
//        console.log('BODY: ' + chunk);
//    });
//}).on("socket", function (socket) {
//    console.log('socket');
//});


//new Agent([options])
//
//options {Object} agent 上的设置选项集合，有以下字段内容:
//    keepAlive {Boolean} 持资源池周围的 socket，用于未来其它请求。默认值为 false。
//keepAliveMsecs {Integer} 使用 HTTP KeepAlive 的时候，通过正在保持活动的 sockets 发送 TCP KeepAlive 包的频繁程度。默认值为 1000。仅当 keepAlive 为 true 时才相关。.】
//maxSockets {Number} 在空闲状态下,还依然开启的 socket 的最大值。仅当 keepAlive 设置为 true 的时候有效。默认值为 256。
//被 http.request 使用的默认的 http.globalAgent ,会设置全部的值为默认。
//
//必须在创建你自己的 Agent 对象后，才能配置这些值。

var http = require('http');
var keepAliveAgent = new http.Agent({ keepAlive: false });
options.agent = keepAliveAgent;

console.log(keepAliveAgent.maxSockets);

http.request(options, (res)=>{
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

http.request(options, (res)=>{
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});


//agent.maxSockets
//
//默认值为 Infinity。决定了每台主机上的 agent 可以拥有的并发 socket 的打开数量，主机可以是 host:port 或 host:port:localAddress。
//
//agent.maxFreeSockets
//
//默认值 256. 对于支持 HTTP KeepAlive 的 Agent 而言，这个方法设置了空闲状态下仍然打开的套接字数的最大值。
//
//agent.sockets
//
//这个对象包含了当前 Agent 使用中的 socket 数组。不要修改它。
//
//agent.freeSockets
//
//使用 HTTP KeepAlive 的时候，这个对象包含等待当前 Agent 使用的 socket 数组。不要修改它。
//
//agent.requests
//
//这个对象包含了还没分配给 socket 的请求数组。不要修改它。
//
//agent.destroy()
//
//销毁任意一个被 agent 使用 的socket。
//
//通常情况下不要这么做。如果你正在使用一个允许 KeepAlive 的 agent，当你知道不在使用它的时候，最好关闭 agent。否则，socket 会一直保存打开状态，直到服务器关闭。
//
//agent.getName(options)
//
//获取一组请求选项的唯一名，来确定某个连接是否可重用。在 http agent 里，它会返回 host:port:localAddress。在 http agent 里， name 包括 CA，cert, ciphers, 和其他 HTTPS/TLS 特殊选项来决定 socket 是否可以重用。
//
//http.globalAgent
//Agent 的全局实例，是 http 客户端的默认请求。