process.stdin.setEncoding('utf8');


//监听输入事件
process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    var d=process.stdin.resume();
    if (chunk !== null) {
        process.stdout.write('data: ' + chunk);
    }
});


//监听结束事件
process.stdin.on('end', function() {
    process.stdout.write('end');
});