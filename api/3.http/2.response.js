'use strict';

let http=require('http');

let server=http.createServer((req,res)=>{
    if(req.url=='/favicon.ico'){
        return;
    }
//    事件： 'close'
//    在调用 response.end()，或准备 flush 前，底层连接结束。
    res.on('close',()=>{
       console.log('close');        //没有触发,原因未知
    });

//    事件： 'finish'
//    发送完响应触发。响应头和响应体最后一段数据被剥离给操作系统后，通过网络来传输时被触发。
//    这并不代表客户端已经收到数据。这个事件之后，响应对象不会再触发任何事件。
    res.on('finish',()=>{
        console.log('finish');
    });

    var body = 'end';

    //这个方法仅能在消息中调用一次，而且必须在 response.end() 前调用。
    //如果你在这之前调用 response.write() 或 response.end(),将会计算出不稳定的头。
    //Content-Length 是字节数，而不是字符数。上面的例子 'hello world' 仅包含一个字节字符。
    //如果 body 包含高级编码的字符， Buffer.byteLength() 就必须确定指定编码的字符数。Node 不会检查Content-Length 和 body 的长度是否相同。
    //res.writeHead(200, {
    //    'Content-Length': body.length-5,      //会截断body
    //    'Content-Type': 'text/plain' });      //会控制返回类型

    //设置相应超时时间
    res.setTimeout(200, ()=>{
       console.log('已经超时');
    });



    //使用默认的 headers 时（没有显式的调用 response.writeHead(),当显式调用时,报错 ），这个属性表示将要发送给客户端响应头。
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
    res.setHeader("abc", '123');
    //使用默认的 headers 时（没有显式的调用 response.writeHead(),当显式调用时,报错 ），这个属性表示将要发送给客户端状态码。
    res.statusCode = 200;

    //如果调用了这个方法，且还没有调用 response.writeHead()，将会切换到默认的 header，并更新这个header。
    //这个方法将发送响应体数据块。可能会多次调用这个方法，以提供 body 成功的部分内容。
    //chunk 可以是字符串或 buffer。如果 chunk 是字符串，第二个参数表明如何将它编码成字节 流。encoding 的默认值是'utf8'。最后一个参数在刷新这个数据块时调用。
    //注意：这个是原始的 HTTP body，和高级的multi-part body 编码无关。
    //第一次调用 response.write() 的时候，将会发送缓存的头信息和第一个 body 给客户端。第二次，将会调用 response.write()。Node 认为你将会独立发送流数据。这意味着，响应缓存在第一个数据块中。
    //如果成功的刷新全部数据到内核缓冲区，返回 true 。如果部分或全部数据在用户内存中还处于排队状况，返回 false 。当缓存再次释放的时候，将会触发 'drain'。
    res.write('Hello','utf8');
    res.write('world','utf8');

    res.addTrailers({'abc': "123"});
    setTimeout(()=>{
        //response.end([data][, encoding][, callback])
        //这个方法告诉服务器，所有的响应头和响应体已经发送；服务器可以认为消息结束。response.end() 方法必须在每个响应中调用。
        res.end(body);
    },500);

    //默认值为 true。若为 true,当 headers 里没有 Date 值时，自动生成 Date 并发送。
    res.sendDate=true;

    //Boolean (只读)。如果headers发送完毕,则为 true,反之为 false。
    console.log('send header end',res.headersSent);
});

server.listen(5000);

//response.getHeader(name)
//
//读取一个在队列中但是还没有被发送至客户端的header。名字是大小写敏感。仅能再头被flushed前调用。
//
//例如:
//
//    var contentType = response.getHeader('content-type');
//response.removeHeader(name)
//
//从即将发送的队列里移除头。
//
//例如:
//
//    response.removeHeader("Content-Encoding");