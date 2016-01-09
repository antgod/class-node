/**
 * Created by lihongji on 2015/6/28.
 */

var fs=require('fs');

//没有文件会创建文件
fs.writeFile('./test.js',new Buffer('珠峰'),{flag:'a'},function(err){

});

//fs.appendFile('./test.js',new Buffer('珠峰'),function(err){
//
//});