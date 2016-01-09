/**
 * Created by lihongji on 2015/6/28.
 */
process.stdin.on("data",function(chunk){
    //杀进程
    process.kill(chunk);
});

