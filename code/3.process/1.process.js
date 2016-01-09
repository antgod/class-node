/**
 * Created by lihongji on 2015/6/28.
 */

/*
* 每个应用程序都是一个进程
* 可以在任何模块中访问
* */

//process.stdin;
//process.stdout;

//process.argv 参数1，node文件位置，参数2，当前js文件，3,4,5参数位置
process.argv.forEach(function(val){
    console.log(val);
});

console.log(process.memoryUsage());
//rss:内存消耗，heapTotal:总量 heapUsed:已经使用量
//{ rss: 11567104, heapTotal: 4083456, heapUsed: 2159936 }


var fs=require("fs");

//文件所在目录
console.log(process.cwd());

console.log(fs.readFileSync("1.txt"));

//更改文件
process.chdir('../');
console.log(fs.readFileSync("code/1.txt"));

//根据用户输入杀死进程
process.stdin.on("data",function(chunk){
    //杀进程
    process.kill(chunk,"SIGTERM");
});

//其他程序内
process.on("SIGTERM",function(){
   console.log("无法自杀");
});

console.log(process.pid);

var say=function(){console.log(1)}

//延迟执行
process.nextTick(say);      //优先级高
//延迟执行
setImmediate(say);


//未捕获错误处理，不推荐
process.on('uncaughtException',function(err){

});

ddd();