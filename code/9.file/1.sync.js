/**
 * fs 文件和目录创建，写入和删除操作
 * 所有的操作都有同步和异步两种实现readFile readFileSync
 * Sync 同步方法 没有sync就是异步方法
 */
var fs = require('fs');
//var content = fs.readFileSync('./1.md','utf-8');
//console.log(content);


fs.readFile('./msg.txt','utf-8',function(err,data){
    console.log(data);
});

fs.readFile('Y:/msg.txt','utf-8',function(err,data){
    console.log(err);
});
