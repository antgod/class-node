/**
 * Created by lihongji on 2015/7/4.
 */

var fs = require("fs");

//文件名，读取模式
//rwa 读取，写入，追加
//fd：追加索引,0 标准输入 1 标准输出 2错误输出 3正常输出
//fs.open('./msg.txt',"r",function(err,fd){
//    fs.close(fd);
//    console.log(fd);
//
//});
//
//setTimeout(function(){
//    fs.open('./msg.txt',"r",function(err,fd){
//        console.log(fd);
//    });
//},1000);

/*
 * fs.read();
 * fd ,buffer,offset,length,position,callback
 * 文件索引
 * buffer 把文件内容读到哪个buffer里
 * offset 从buffer的offset偏移开始写入
 * length 从文件读取的字节数
 * position 文件的位置
*/

fs.open("./msg.txt",'r',function(err,fd){
   var buff=new Buffer(9);
    fs.read(fd,buff,0,6,3,function(err,bytesRead){
       console.log(bytesRead,buff.slice(0,bytesRead).toString());
        fs.read(fd,buff,6,3,9,function(err,bytesRead){
            console.log(bytesRead,buff.toString());
        });
    });
});