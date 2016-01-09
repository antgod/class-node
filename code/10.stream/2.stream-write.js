/**
 * Created by lihongji on 2015/7/4.
 */

/*
 * 有些时候我们不关心文件内容和文件大小，只需要关注是否读到数据，以及读到数据应该如何处理
 * 流是一组有序，有起点和终点的，字节传输手段
 */


var fs=require("fs");
var ws = fs.createWriteStream("target.txt");        //流对象

ws.write('hello');
ws.end("over");