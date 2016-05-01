//包含命令行参数的数组。第一个元素是'node'，第二个参数是 JavaScript 文件的名字，第三个参数是任意的命令行参数。

// print process.argv
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

// node  --harmony 6.args.js one two=123 -v
console.log('启动进程参数',process.execArgv,'命令行参数',process.argv,'node.exe绝对路径',process.execPath);

//启动进程参数 [ '--harmony' ] 命令行参数 [ '/Users/lihongji/.nvm/versions/node/v4.4.0/bin/node',
//    '/Users/lihongji/now/node/api/2.process/6.args.js',
//    'one',
//    'two=123',
//    '-v' ] node.exe绝对路径 /Users/lihongji/.nvm/versions/node/v4.4.0/bin/node