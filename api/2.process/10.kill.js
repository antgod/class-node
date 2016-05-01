//发送一个信号到进程.pid是进程id,参数signal是要发送信号的一个字符串描述.信号的命名看起来像:'SIGINT'or'SIGINT1'.如果省略signal参数,将默认是:'SIGTERM'
//注意,正因为名字是process.kill,它确实只是一个信号发送器.就像系统调用call一样.发送的信号,可能除了杀死进程外还要做其他一些事情.

//给自己发送一个进程的例子:

process.on('SIGHUP', function () {
    console.log('Got SIGHUP signal.');
});

setTimeout(function () {
    console.log('Exiting.');
    //process.exit(0);
}, 3000);

//进程的pid属性
process.kill(process.pid, 'SIGHUP');