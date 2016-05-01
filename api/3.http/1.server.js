'use strict';

let http=require('http');

let server=http.createServer((req,res)=>{
    if(req.url=='/favicon.ico'){
        return;
    }
    //console.log(http.METHODS,http.STATUS_CODES);

    res.writeHead(200,{
        Connection:'keep-alive'
    });

    setTimeout(()=>{
        res.end('');
    },1000);

    if(req.url=='/a.js'){
        res.write("var a=1;")
    }else{
        res.write("<script src='a.js'></script>hello")
    }
});

//options {Object} - 必须. 支持以下属性:
//port {Number} - 可选.
//host {String} - 可选.
//backlog {Number} - 可选.
//path {String} - 可选.
//exclusive {Boolean} - 可选.
server.listen({
    host: 'localhost',
    port: 5000,
    exclusive: true
},()=>{
    console.log('listen callback');
});

server.on('request',(req,res)=>{
    //console.log('IncomingMessage',req);
    //console.log('ServerResponse',res);
    console.log('request event');   //两条event

    //服务器停止接收新的连接，保持现有连接。这是异步函数，当所有连接结束的时候服务器会关闭，并会触发 'close' 事件。
    //你可以传一个回调函数来监听 'close' 事件。如果存在，将会调用回调函数，错误（如果有）作为唯一参数。
    //server.close();
});

server.on('connection',(Socket)=>{
    //console.log('Socket',Socket);
    console.log('connect event');

    //操作系统返回绑定的地址，协议族名和服务器端口。查找哪个端口已经被系统绑定时，非常有用。
    //返回的对象有3个属性，比如： { port: 12346, family: 'IPv4', address: '127.0.0.1' }
    //在 'listening' 事件触发前，不要调用 server.address()。
    console.log('服务器信息',server.address());
});

server.on('close',()=>{
    console.log('close event');
});

server.on('timeout',()=>{
    console.log('timeout event');
});


//最大请求头的数量限制，默认 1000。如果设置为 0，则不做任何限制。
server.maxHeadersCount = 10;


//{Number} Default = 120000 (2 minutes)
//超时的时长，单位为毫秒。
//
//注意，socket 的超时逻辑在连接时设定，所以有新的连接时才能改变这个值。

//设为 0 时，建立连接的自动超时将失效
//如果有事件处理函数,相当于catch,将捕获超时,服务端正常返回,如果没有事件处理函数,服务端超时不会返回数据
server.timeout=100; //设置超时时间,通常要比setTimeout时间大一些,时间会浪费在建立请求上.

//同上
server.setTimeout(800, ()=>{
    console.log('timeout callback');
});


//其他事件参考
//事件： 'checkContinue'
//
//function (request, response) { }
//
//当 http 收到 100-continue 的 http 请求时会触发。如果没有监听这个事件，服务器将会自动发送 100 Continue 的响应。
//
//如果客户端需要继续发送请求主题，或者生成合适的 HTTP 响应（如，400 请求无效），可以通过调用 response.writeContinue() 来处理。
//
//注意：触发并处理这个事件的时候，不会再触发 request 事件。
//
//事件： 'connect'
//
//function (request, socket, head) { }
//
//当客户端请求 http 连接时触发。如果没有监听这个事件，客户端请求连接的时候会被关闭。
//
//request 是 http 请求的参数，与 request 事件参数相同。
//socket 是服务器和客户端间的 socket。
//head 是 buffer 的实例。网络隧道的第一个包，可能为空。
//这个事件触发后，请求的 socket 不会有 data 事件监听器，也就是说你需要绑定一个监听器到 data 上，来处理在发送到服务器上的 socket 数据。
//
//事件： 'upgrade'
//
//function (request, socket, head) { }
//
//当客户端请求 http upgrage 时候会触发。如果没有监听这个事件，客户端请求一个连接的时候会被关闭。
//
//request 是 http 请求的参数，与 request 事件参数相同。
//socket 是服务器和客户端间的 socket。
//head 是 buffer 的实例。网络隧道的第一个包，可能为空。
//这个事件触发后，请求的 socket 不会有 data 事件监听器，也就是说你需要绑定一个监听器到 data 上，来处理在发送到服务器上的 socket 数据。
//
//事件： 'clientError'
//
//function (exception, socket) { }
//
//如果一个客户端连接触发了一个 'error' 事件, 它就会转发到这里.
//
//    socket 是导致错误的 net.Socket 对象。