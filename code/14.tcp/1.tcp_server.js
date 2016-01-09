/**
 * Created by lihongji on 2015/7/4.
 */

var http=require("http");
var net=require("net");
var util=require("util");
var fs=require("fs");
var out=fs.createWriteStream('./a.txt');
var server=net.createServer(function(socket){
    console.log("客户端已经连接");
    server.getConnections(function(err,count){
           console.log("服务器端已经有"+count+"连接");
    });

    socket.setEncoding('utf8');

//    socket.on("data",function(data){
//        console.log(data);
//        console.log('已接收到的数据量为%d字节',socket.bytesRead);
//        socket.write(data+" too");
//    });

    socket.pipe(out);

    socket.on("close",function(){
       console.log("关闭");
       //server.unref();
    });

    socket.on("error",function(){
        console.log("错误");
        socket.destroy();
    });
});

server.listen(8080,function(){
    console.log("服务器已经启动",util.inspect(server.address()));
});