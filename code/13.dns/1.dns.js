/**
 * Created by lihongji on 2015/7/4.
 */

var dns=require("dns");
dns.resolve("www.baidu.com","A",function(err,address){
    console.log(address);
});

dns.lookup("www.sina.com",4,function(err,address,family){
    console.log(address);
    console.log(family);
});

dns.reverse("23.200.143.77",function(err,domains){
    console.log(domains);
});

var os=require("os");

//os.tmpdir()
//os.endianness()
//os.hostname()
//os.type()
//os.platform()
//os.arch()
//os.release()
//os.uptime()
//os.loadavg()
//os.totalmem()
//os.freemem()
//os.cpus()
//os.networkInterfaces()
//os.EOL