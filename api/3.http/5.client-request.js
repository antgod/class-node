'use strict';

let http=require('http');
let net=require('net');
let url=require('url');

var options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
        "Expect":"100-continue",
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});


req.on('socket', function(socket) {
    console.log('socket event ' );
});

req.on('response', function(response) {
    console.log('response event ' );
});

req.on('connect', function(response, socket, head) {
    console.log('connect event ' );
});

console.log(req.headers);

//事件： 'upgrade'
//
//function (response, socket, head) { }
//
//每当服务器响应 upgrade 请求时触发。如果没有监听这个事件,客户端会收到 upgrade 头后关闭连接。
//
//事件： 'continue'
//
//function () { }
//
//当服务器发送 '100 Continue' HTTP 响应的时候触发，通常因为请求包含 'Expect: 100-continue'。该指令表示客户端应发送请求体。




//事件： 'continue'
//
//function () { }
//
//当服务器发送 '100 Continue' HTTP 响应的时候触发，通常因为请求包含 'Expect: 100-continue'。该指令表示客户端应发送请求体。
//
//request.flushHeaders()
//
//刷新请求的头。
//
//考虑效率因素，Node.js 通常会缓存请求的头直到你调用 request.end()，或写入请求的第一个数据块。然后，包装请求的头和数据到一个独立的 TCP 包里。
//
//request.write(chunk[, encoding][, callback])
//
//发送一个请求体的数据块。通过多次调用这个函数，用户能流式的发送请求给服务器，这种情况下，建议使用['Transfer-Encoding', 'chunked'] 头。
//
//chunk 参数必须是 Buffer 或字符串。
//
//回调参数可选，当这个数据块被刷新的时候会被调用。
//
//request.end([data][, encoding][, callback])
//
//发送请求完毕。如果 body 的数据没被发送，将会将他们刷新到流里。如果请求是分块的，该方法会发送终结符0\r\n\r\n 。
//
//如果指定了 data，等同于先调用 request.write(data, encoding)，再调用 request.end(callback)。
//
//如果有 callback，将会在请求流结束的时候调用。
//
//request.abort()
//
//终止一个请求. (v0.3.8 开始新加入)。
//
//request.setTimeout(timeout[, callback])
//
//如果 socket 被分配给这个请求，并完成连接，将会调用 socket.setTimeout() 。
//
//request.setNoDelay([noDelay])
//
//如果 socket 被分配给这个请求，并完成连接，将会调用 socket.setNoDelay()。
//
//request.setSocketKeepAlive([enable][, initialDelay])
//
//如果 socket 被分配给这个请求，并完成连接，将会调用 socket.setKeepAlive()。
//
//http.IncomingMessage
//http.Server 或 http.ClientRequest 创建了 IncomingMessage 对象，作为第一个参数传递给 'response'。它可以用来访问应答的状态，头文件和数据。
//
//它实现了 Readable Stream 接口，以及以下额外的事件，方法和属性。
//
//事件： 'close'
//
//function () { }
//
//表示底层连接已经关闭。 和 'end'类似，这个事件每个应答只会发送一次。
//
//message.httpVersion
//
//客户端向服务器发送请求时，客户端发送的 HTTP 版本；或者服务器想客户端返回应答时，服务器的 HTTP 版本。通常是 '1.1' 或 '1.0' 。
//
//另外， response.httpVersionMajor 是第一个整数，response.httpVersionMinor 是第二个整数。
//
//message.headers
//
//请求/响应头对象。
//
//只读的头名称和值的映射。头的名字是小写，比如：
//
//// Prints something like:
////
//// { 'user-agent': 'curl/7.22.0',
////   host: '127.0.0.1:8000',
////   accept: '*/*' }
//console.log(request.headers);
//message.rawHeaders
//
//接收到的请求/响应头字段列表。
//
//注意，键和值在同一个列表中。它并非一个元组列表。所以，偶数偏移量为键，奇数偏移量为对应的值。
//
//头名字不是小写敏感，也没用合并重复的头。 // Prints something like: // // [ 'user-agent', // 'this is invalid because there can be only one', // 'User-Agent', // 'curl/7.22.0', // 'Host', // '127.0.0.1:8000', // 'ACCEPT', // '/' ] console.log(request.rawHeaders);
//
//message.trailers
//
//请求/响应 的尾部对象。只在 'end' 事件中存在。
//
//message.rawTrailers
//
//接收到的原始的请求/响应尾部键和值。仅在 'end' 事件中存在。
//
//message.setTimeout(msecs, callback)
//
//msecs {Number}
//callback {Function}
//调用 message.connection.setTimeout(msecs, callback).
//
//    message.method
//
//仅对从 http.Server 获得的请求有效。
//
//请求方法如果一个只读的字符串。 例如：'GET', 'DELETE'.
//
//    message.url
//
//仅对从 http.Server 获得的请求有效。
//
//请求的 URL 字符串。它仅包含实际的 HTTP 请求中所提供的 URL，比如请求如下：
//
//GET /status?name=ryan HTTP/1.1\r\n
//Accept: text/plain\r\n
//\r\n
//request.url 就是:
//
//    '/status?name=ryan'
//如果你想将 URL 分解，可以用 require('url').parse(request.url)，例如：
//
//node> require('url').parse('/status?name=ryan')
//{ href: '/status?name=ryan',
//    search: '?name=ryan',
//    query: 'name=ryan',
//    pathname: '/status' }
//如果想从查询字符串中解析出参数，可以用 require('querystring').parse 函数，或者将true 作为第二个参数传递给 require('url').parse。 例如：
//
//node> require('url').parse('/status?name=ryan', true)
//{ href: '/status?name=ryan',
//    search: '?name=ryan',
//    query: { name: 'ryan' },
//    pathname: '/status' }
//message.statusCode
//
//仅对从 http.ClientRequest 获取的响应有效。
//
//3位数的 HTTP 响应状态码 404。
//
//message.statusMessage
//
//仅对从 http.ClientRequest 获取的响应有效。
//
//HTTP 的响应消息。比如， OK 或 Internal Server Error.
//
//    message.socket
//
//和连接相关联的 net.Socket 对象。