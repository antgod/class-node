/**
 * Created by lihongji on 2015/7/4.
 */

var fs = require("fs");

fs.open("./msg.txt",'r',function(err,fd){
    var buff=new Buffer(12);
    var bytesRead=fs.readSync(fd,buff,0,6,0);
    console.log(bytesRead,buff.slice(0,bytesRead).toString());

    var bytesRead1=fs.readSync(fd,buff,6,6,6);
    console.log(bytesRead1,buff.toString());
});

