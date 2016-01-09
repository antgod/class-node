var net = require('net');
var util = require('util');
/**
 *
 **/
var socket = new net.Socket();
socket.setEncoding('utf8');
//指定服务器的端口和IP
socket.connect(8080,'127.0.0.1',function(){
    //服务器IP地址 服务器的端口 客户端的IP 客户端的端口
    console.log(socket.remoteAddress,socket.remotePort,
        socket.localAddress,socket.localPort);
    socket.write('hello server!');
    setTimeout(function(){
        socket.end('你好坏');
    },5000)
})

socket.on('error',function(){
    console.log('error');
    socket.destroy();
});

socket.on('end',function(){
    console.log('客户端关闭连接');
});

socket.on('data',function(data){
    console.log('已经接收到服务器端的响应',data);
});