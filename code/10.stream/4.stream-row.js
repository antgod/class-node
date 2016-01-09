/**
 * Created by lihongji on 2015/7/4.
 */
var fs=require("fs");
var EventEmitter=require("events").EventEmitter;
var util=require("util");
var os=require("os");
var RETURN_FLAG=os.EOL;

var RETURN=0x0d;            //  \r
var NEWLINE=0x0a;           //  \n

function LineReader(path){
    this._rs=fs.createReadStream(path,'r');
}

util.inherits(LineReader,EventEmitter);

LineReader.prototype.on('newListener',function(eventName){
    if(eventName == 'newLine'){
        var line = [];//声明临时数组
        var self = this;//保存this指针
        this._rs.on('readable',function(){
            var ch;
            while(null != (ch = this.read(1))){
                // \r
                if(ch[0] == RETURN){
                    this.read(1); // \n
                    self.emit('newLine',Buffer.concat(line).toString());
                    line=[];
                }else{
                    line.push(ch);
                }
            }
        });
        this._rs.on('end',function(){
            self.emit('newLine',Buffer.concat(line).toString());
            self.emit('end');
        });
    }
});

var lineReader=new LineReader("./source.txt");
lineReader.on("newLine",function(line){
    console.log(line);
});


lineReader.on("end",function(){
    console.log("读取完毕");
});


