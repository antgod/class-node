//事件: 'uncaughtException'
//当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
//注意，uncaughtException 是非常简略的异常处理机制。
//尽量不要使用它，而应该用 domains 。如果你用了，每次未处理异常后，重启你的程序。

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

setTimeout(function() {
    console.log('This will still run.');
    asyncNotExistFun();
}, 500);

// Intentionally cause an exception, but don't catch it.
notExistFun();
console.log('This will not run.');
