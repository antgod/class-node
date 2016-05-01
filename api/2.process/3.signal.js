//Signal 事件
//当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等
//
//监听 SIGINT 的例子:

// Start reading from stdin so we don't exit.
process.stdin.resume();

console.log(process.pid);

process.on('SIGINT', function() {
    console.log('Got SIGINT.  Press Control-D to exit.');
});


//在大多数终端程序里，发送 SIGINT 信号的简单方法是按下 信号Control-C。
//
//注意:
//
//SIGUSR1 node.js 接收这个信号开启调试模式。可以安装一个监听器，但开始时不会中断调试。
//SIGTERM 和 SIGINT 在非 Windows 系统里，有默认的处理函数，退出（伴随退出代码 128 + 信号码）前，重置退出模式。如果这些信号有监视器，默认的行为将会被移除。
//SIGPIPE 默认情况下忽略，可以加监听器。
//SIGHUP 当 Windowns 控制台关闭的时候生成，其他平台的类似条件，参见signal(7)。可以添加监听者，Windows 平台上 10 秒后会无条件退出。在非 Windows 平台上，SIGHUP 的默认操作是终止 node，但是一旦添加了监听器，默认动作将会被移除。 SIGHUP is to terminate node, but once a listener has been installed its
//SIGTERM Windows 不支持, 可以被监听。
//SIGINT 所有的终端都支持，通常由CTRL+C 生成（可能需要配置）。当终端原始模式启用后不会再生成。
//SIGBREAK Windows 里，按下 CTRL+BREAK 会发送。非 Windows 平台，可以被监听，但是不能发送或生成。
//SIGWINCH - 当控制台被重设大小时发送。Windows 系统里，仅会在控制台上输入内容时，光标移动，或者可读的 tty在原始模式上使用。
//SIGKILL 不能有监视器，在所有平台上无条件关闭 node。
//SIGSTOP 不能有监视器。
//Windows 不支持发送信号，但是 node 提供了很多process.kill() 和 child_process.kill() 的模拟：
//
//发送 Sending 信号 0 可以查找运行中得进程
//发送 SIGINT, SIGTERM, 和 SIGKILL 会引起目标进程无条件退出。