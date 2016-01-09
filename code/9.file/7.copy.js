/**
 * Created by lihongji on 2015/7/4.
 */

var fs = require("fs");
 var BUFFER_SIZE=1;


function copy(src,desc,flag){
    //读到的位置 来源fd 目标fd 实际读到的字节数
    var fdSrc,fdDest,readSoFar,read;

    var buff=new Buffer(BUFFER_SIZE);

    if(!fs.existsSync(src)){
        console.log("文件不存在");
        return ;
    }
    fdsrc=fs.openSync(src,"r");
    fdDest=fs.openSync(desc,"w");

    //当前读取位置
    readSofar=0;

    var counter=0;
    do{
        read=fs.readSync(fdsrc,buff,0,BUFFER_SIZE,readSoFar);
        fs.writeSync(fdDest,buff,0,read,null);
        readSofar += read;
        console.log(counter++) ;
    }while(read==BUFFER_SIZE);

    fs.closeSync(fdsrc);
    fs.closeSync(fdDest);

    if(flag=="cut"){
        fs.unlinkSync(src);
    }
}

copy("src.txt","dest.txt");