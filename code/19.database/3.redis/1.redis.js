var redis = require('redis');
var client = redis.createClient(6379,'123.57.143.189');
client.set('name','zfpx',function(err,result){
    console.log('set',result);
});

client.hset('zry','name2','zry',redis.print);
client.hset('zry','age',6,function(){

});

client.hkeys('zry',function(err,repies){
    repies.forEach(function(reply,i){
        console.log('reply',reply);
    });
    client.quit();
});