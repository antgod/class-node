//这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。
//process.abort();

try {
    //改变当前工作进程的目录，如果操作失败抛出异常。
    process.chdir('..');
    //返回当前进程的工作目录
    console.log('Current directory: ' + process.cwd());
}catch (e){
    console.log(e.stack);
}

//当前工作目录与当前进程目录
console.log('current',process.cwd(),__dirname);

//包含用户环境的对象
console.log('current env',process.env);

//process.title
//获取/设置(Getter/setter) 'ps' 中显示的进程名。
//process.arch
//当前 CPU 的架构：'arm'、'ia32' 或者 'x64'.
//process.platform
//运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
//process.memoryUsage()
//返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。
//返回 Node 已经运行的秒数。
console.log(process.title,process.arch,process.platform,process.memoryUsage(),process.uptime())
