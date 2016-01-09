/*
 * 发布订阅模式是一种消息通信模式
 * 主要目的是为了解耦消息发布者和消息订阅者之间的耦合
 * publish subscrbe
 */
var redis = require('redis');
var client1 = redis.createClient(6379,'123.57.143.189');
var client2 = redis.createClient(6379,'123.57.143.189');
//当client订阅消息的时候执行回调
client1.on('subscribe',function(channel,count){
    console.log(arguments);
    //channel消息的类型            消息的内容
    client2.publish('newsong','xiaojixiaoji');
});
client1.on('message',function(channel,message){
    console.log(channel,message);
});
client1.subscribe('newsong');