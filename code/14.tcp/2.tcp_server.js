/**
 * TCP (Transmission control protocal)传输控制协议
 * 是一个可靠的 面向连接的 传输层协议
 * 数据完整有序从一台计算机到另一台计算机
 * 发送方将字节流分割成合适的报文，将数据交给IP层，接收方可以将接收到的报文重新装配成字节流
 * TCP对字符编码完全无知
 * tcp通过流控制的方式来保证两点间的数据平衡
 *
 */
var http = require('http');
var net = require('net');
var util = require('util');
var fs = require('fs');

http.createServer();
var server = net.createServer({allowHalfOpen:true},function(socket){
    console.log('客户端已经连接');
    console.log(util.inspect(socket.remoteAddress));
    server.getConnections(function(err,count){
        console.log('现在一共有个%d连接了',count);
    });
    socket.setEncoding('utf8');

    socket.setTimeout(5*1000);
//    socket.on('data',function(data){
//        console.log('客户端说',data);
//        socket.write(data+" too");
//    });

    socket.on('end',function(){
        console.log('客户端end了');
        //server.unref();
    });

    socket.on('close',function(){
        console.log('客户端close了');
        server.unref();
    });
    socket.on('error',function(){
        socket.destroy();
    });

});
server.listen(8080,function(){
    console.log('服务器已经启动',util.inspect(server.address()));
});