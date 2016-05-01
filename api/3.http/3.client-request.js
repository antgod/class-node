//http.request(options[, callback])
//Node 维护每个服务器的连接来生成 HTTP 请求。这个函数让你可以发布请求。
//参数options是对象或字符串。如果 options 是字符串，会通过 url.parse() 自动解析。
//options 值:
    //host: 请求的服务器域名或 IP 地址，默认：'localhost'
    //hostname: 用于支持 url.parse()。 hostname 优于 host
    //port: 远程服务器端口。 默认： 80.
    //localAddress: 用于绑定网络连接的本地接口
    //socketPath: Unix域 socket（使用host:port或socketPath
    //method: 指定 HTTP 请求方法。 默认： 'GET'.
    //path: 请求路径。 默认： '/'。如果有查询字符串，则需要包含。例如'/index.html?page=12'。请求路径包含非法字符时抛出异常。目前，只有空格不行，
    //不过在未来可能改变。
    //headers: 包含请求头的对象
    //auth: 用于计算认证头的基本认证，即 user:password
    //agent: 控制Agent的行为。当使用了一个Agent的时候，请求将默认为Connection: keep-alive。可能的值为：
    //undefined (default): 在这个主机和端口上使用 global Agent
    //Agent object: 在Agent中显式使用 passed .
    //    false: 选择性停用连接池,默认请求为： Connection: close.
    //    keepAlive: {Boolean} 持资源池周围的socket，用于未来其它请求。默认值为false。
    //keepAliveMsecs: {Integer} 使用HTTP KeepAlive 的时候，通过正在保持活动的sockets发送TCP KeepAlive包的频繁程度。默认值为1000。
    //仅当keepAlive为true时才相关。

//http.request() 返回一个 http.ClientRequest类的实例。ClientRequest实例是一个可写流对象。如果需要用 POST 请求上传一个文件的话，
//就将其写入到ClientRequest对象。


var http=require('http');
var querystring=require('querystring');

//附加请求参数
var postData = querystring.stringify({
    'msg' : 'Hello World!'
});

var options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
        "Expect":"100-continue",
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
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

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.on('socket', function(socket) {
    console.log('socket event ' );
});


//事件： 'response'
//function (response) { }
//当接收到请求的时候会触发，仅会触发一次。 response 的参数是 http.IncomingMessage 的实例。
req.on('response',(response)=>{
    console.log('response event'
        //response
    );
});


// write data to request body
//附加请求参数
req.write(postData);
req.end();

//注意，例子里调用了 req.end()。http.request() 必须调用 req.end() 来表明请求已经完成，即使没有数据写入到请求 body 里。
//如果在请求的时候遇到错误（DNS 解析、TCP 级别的错误或实际 HTTP 解析错误），在返回的请求对象时会触发一个 'error' 事件。
//
//有一些特殊的头需要注意：
//
//    发送 Connection: keep-alive 告诉服务器保持连接，直到下一个请求到来。
//
//    发送 Content-length 头将会禁用chunked编码。
//
//    发送一个 Expect 头，会立即发送请求头，一般来说，发送 Expect: 100-continue ,你必须设置超时，并监听 continue 事件。更多细节参见 RFC2616 Section 8.2.3 。
//
//    发送一个授权头，将会使用 auth 参数重写，来计算基本的授权。
//    http.get(options[, callback])
//    因为多数请求是没有报文体的 GET 请求， Node 提供了这个简便的方法。和 http.request() 唯一不同点在于，这个方法自动设置 GET，并自动调用 req.end()。


http.get("http://www.google.com/index.html", function(res) {
    console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});