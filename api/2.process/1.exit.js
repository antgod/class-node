//退出状态码
//当没有新的异步的操作等待处理时，Node 正常情况下退出时会返回状态码 0 。下面的状态码表示其他状态：
//
//1 未捕获的致命异常-Uncaught Fatal Exception - 有未捕获异常，并且没有被域或 uncaughtException 处理函数处理。
//2 - Unused (保留)
//3 JavaScript解析错误-Internal JavaScript Parse Error - JavaScript的源码启动 Node 进程时引起解析错误。非常罕见，仅会在开发 Node 时才会有。
//4 JavaScript评估失败-Internal JavaScript Evaluation Failure - JavaScript的源码启动 Node 进程，评估时返回函数失败。非常罕见，仅会在开发 Node 时才会有。
//5 致命错误-Fatal Error - V8 里致命的不可恢复的错误。通常会打印到 stderr ，内容为： FATAL ERROR
//6 Non-function 异常处理-Non-function Internal Exception Handler - 未捕获异常，内部异常处理函数不知为何设置为on-function，并且不能被调用。
//7 异常处理函数运行时失败-Internal Exception Handler Run-Time Failure - 未捕获的异常， 并且异常处理函数处理时自己抛出了异常。例如，如果 process.on('uncaughtException') 或 domain.on('error') 抛出了异常。
//8 - Unused保留. 之前版本的 Node， 8 有时表示未捕获异常。
//9 - 参数非法-Invalid Argument - 可能是给了未知的参数，或者给的参数没有值。
//10 运行时失败-Internal JavaScript Run-Time Failure - JavaScript的源码启动 Node 进程时抛出错误，非常罕见，仅会在开发 Node 时才会有。
//12 无效的 Debug 参数-Invalid Debug Argument - 设置了参数--debug 和/或 --debug-brk，但是选择了错误端口。
//>128 信号退出-Signal Exits - 如果 Node 接收到致命信号，比如SIGKILL 或 SIGHUP，那么退出代码就是128 加信号代码。这是标准的 Unix 做法，退出信号代码放在高位。

//1.事件: 'exit'
//当进程准备退出时触发。此时已经没有办法阻止从事件循环中推出。因此，你必须在处理函数中执行同步操作。这是一个在固定事件检查模块状态（比如单元测试）的好时机。回调函数有一个参数，它是进程的退出代码。

process.on('exit', function(code) {
    // do *NOT* do this
    setTimeout(function() {
        console.log('This will not run');
    }, 0);
    console.log('About to exit with code:', code);
});

//事件: 'beforeExit'
//当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
//'beforeExit' 并不是明确退出的条件，process.exit() 或异常捕获才是，所以不要把它当做'exit' 事件。除非你想安排更多的工作。

process.on('beforeExit', function(code) {

    console.log('process beforeExit', code);
});



//未捕获错误
throw new Error('error');
