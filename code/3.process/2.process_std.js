/**
 * Created by lihongji on 2015/6/28.
 */
console.log(process.pid);

process.stdin.on("data",function(chunk){
    //杀进程
    process.stdout.write(chunk);
});


process.on("SIGTERM",function(){
    console.log("无法自杀");
});



