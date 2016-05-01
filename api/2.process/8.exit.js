//process.exit([code])
//使用指定的 code 结束进程。如果忽略，将会使用 code 0

//使用失败的代码退出：
//process.exit(1); //Shell 将会看到退出代码为1.

//process.exitCode
//进程退出时的代码，如果进程优雅的退出,设定 process.exit(code) 将会重写之前设置的 process.exitCode。
process.exitCode=2;
process.exit(2)