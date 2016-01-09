/**
 * Created by lihongji on 2015/7/11.
 */
var dgram=require("dgram");

var util=require("util");

//var server=dgram.createSocket("udp4",function(msg,rinfo){
//   console.log("接收到 ",msg.toString());
//   console.log(util.inspect(rinfo));
//});


var dgram = require('dgram');
var util = require('util');
var server = dgram.createSocket('udp4');
var buffer=new Buffer('服务器发送数据');

server.on('message',function(msg,rinfo){
    console.log('接收到 ',msg.toString());
    console.log(util.inspect(rinfo));
    server.send(buffer,0,buffer.length,4321,'localhost');
});

server.bind(1234,'localhost');