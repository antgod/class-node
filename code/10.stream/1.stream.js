/**
 * Created by lihongji on 2015/7/4.
 */

/*
 * 有些时候我们不关心文件内容和文件大小，只需要关注是否读到数据，以及读到数据应该如何处理
 * 流是一组有序，有起点和终点的，字节传输手段
 */


var fs=require("fs");

//var rs = fs.createReadStream("./source.txt",{highWaterMark:65*1024});        //流对象
var rs = fs.createReadStream("./source.txt",{highWaterMark:1*1024});        //流对象

//rs.on("open",function(){
//   console.log("文件打开了");
//});
//
//rs.on("data",function(data){
//    console.log("读到了数据",data.toString());
//});
//
//rs.on("end",function(){
//    console.log("文件关闭");
//});

//读取方式有两种，以上代码流动模式，以下代码：非流动模式

var arr = [];
rs.on("readable",function(){
    console.log("readable");
    console.log(rs.read(64*1024));

    var data;
    while(null != (data = rs.read(1024*65))){
        arr.push(data);
    }
});






