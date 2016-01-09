/**
 * Created by lihongji on 2015/7/25.
 */

var redis=require("redis");

var client=redis.createClient(6379,'127.0.0.1');

client.set('name',"zfpx",function(){
    console.log(arguments);
});

client.hset('zry','name','zry',redis.print);
client.hset('zry','age',6,redis.print);

//client.hkeys("zry",function(err,repies){
//   repies
//});