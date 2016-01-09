/**
 * Created by lihongji on 2015/7/4.
 */
var fs = require("fs");
var EventEmitter = require("events").EventEmitter;
var util = require("util");
var os = require("os");
var RETURN_FLAG = os.EOL;

var RETURN = 0x0d;            //  \r
var NEWLINE = 0x0a;           //  \n

function LineReader(path) {
    this.fdsrc = fs.openSync(path, "r");
}
util.inherits(LineReader, EventEmitter);

LineReader.prototype.on('newListener', function (eventName) {
    if (eventName == 'newLine') {
        var line = [];//声明临时数组
        var self = this;//保存this指针
        var counter = 0;
        var BUFFER_SIZE = 1;
        var buff = new Buffer(BUFFER_SIZE);
        var read;
        var i = 0;

        process.nextTick(function () {             //因为下列代码为同步执行，所以需要延迟到on("newLine")声明完之后执行
            do {
                read = fs.readSync(self.fdsrc, buff, 0, BUFFER_SIZE, i++);
                if (buff[0] == 0x0d) {       //换行
                    read = fs.readSync(self.fdsrc, buff, 0, BUFFER_SIZE, i++);
                    self.emit('newLine', line.join(""));
                    line = [];
                } else if (read) {           //正常读取文字
                    line.push(buff.toString());
                } else {                     //读取到最后一个文字
                    self.emit('newLine', line.join(""));
                    self.emit('end');
                }
            } while (read);
        });
    }
});

var lineReader = new LineReader("./source.txt");
lineReader.on("newLine", function (line) {
    console.log(line);
});

lineReader.on("end", function () {
    console.log('loading end');
});



