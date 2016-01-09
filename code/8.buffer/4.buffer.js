/**
 * 1.缓存区Buffer
 * TCP 文件 视频 需要处理二进制数据
 * node buffer帮我们处理二进制
 **/

//TCP 字节=
    //2. buffer 0-255
var sum =0;
for(var i=0;i<8;i++){
    sum += Math.pow(2,i);
}
console.log(sum);
var buffer = new Buffer(1);
buffer[0] = 256;
console.log(buffer);// 默认是用16进制来表示的

//如果大于255，则对256取值 257-1
// 如果小于0，则先模上256再加256 - f6

/**
 * 3. 创建 buffer对象的三种方式
 * 1.new Buffer(size)
 * 2.数组创建 new Buffer(array);
 * 3.使用字符串创建 new Buffer(str,[encoding]);
 */

var buffer = new Buffer(12);
//fill(value, start=0, end=buffer.length)
buffer.fill(5,1,5);		//5长度减一？
console.log(buffer);

var buffer = new Buffer([1,2,3]);
console.log(buffer);
var buffer = new Buffer('珠峰培训');
//e7 8f a0 e5 b3 b0 e5 9f b9 e8 ae ad
//utf8编码中 一个汉字是用3个字节来表示的
console.log(buffer);


//4 长度
var str = "珠峰培训";
var buffer = new Buffer(str);
console.log(str.length);
console.log(buffer.length);

//editable 字符串具有不变性？
str[0]  ='我';
buffer[0] = 1;
console.log(str);//珠峰培训
console.log(buffer);



//slice
var subs = str.slice(1,2);
console.log(subs);//峰
var subsb = buffer.slice(1,2);
console.log(subsb);//8f
subsb[0] = 0xff;
console.log(buffer.slice(1,2));//0x8f



//缓存区和字符串对象的转换
var buffer = new Buffer('珠峰培训');
console.log(buffer.toString('utf8',0,6));//珠峰

//write方法
var buffer = new Buffer(12);
//string, offset, length
//分二次写入buffer中，第一次写入珠峰，第二次写入培训
buffer.write('珠峰');
buffer.write('培训',6);
console.log(buffer.toString('utf8'));//珠峰培训
//乱码的解决方案
var buffer = new Buffer('123456789012');
console.log(buffer);
var buf1 = new Buffer([0x31,0x32,0x33,0x34,0x35,0x36,
    0x37]);
var buf2 = new Buffer([0x38,0x39,0x30,0x31,0x32]);
console.log(buf1.toString());
console.log(buf2.toString());




//1.先存储后合并
function concat(arr,length){
    var totalBuf = new Buffer(length);
    if(arr.length==0)
        return totalBuf;
    if(arr.length==1){
        return arr[0];
    }else{
        var index =0;
        for(var i=0;i<arr.length;i++){
            arr[i].copy(totalBuf,index,0,arr[i].length);
            index+=arr[i].length;
        }
    }
    return totalBuf;
}

console.log('concat'+concat([buf1,buf2],
    buf1.length+buf2.length).toString());

//使用StringDecoder
var StringDecoder = require('string_decoder')
    .StringDecoder;
var decoder1 = new StringDecoder();
var decoder2 = new StringDecoder();
console.log(decoder1.write(buf1));
console.log(decoder2.write(buf2));


//write数字  number 。有些时候需要知道具体的类型
//writeInt8(value,offset,[noAssert])
//readInt8(offset,[noAssert])
var buffer = new Buffer(4);
buffer.writeInt8(0,0);
buffer.writeInt8(16,1);
buffer.writeInt8(32,2);
buffer.writeInt8(0x30,3);
console.log(buffer.readInt8(0));
console.log(buffer.readInt8(1));
console.log(buffer.readInt8(2));
console.log(buffer.readInt8(3));
//高位和低位
//一般一个16位双字节的数据，ff1a 高位ff 低位1a
//正向 高位优先 big-endian  BE
//逆向 低位优先 little-endian LE
console.log(buffer.readInt16BE(0));//4096
//console.log(Math.pow(2,12));



//复制缓存
//Buffer.copy();
//target 复制的目标对象
//target_start 往目标里复制时的起始位置
//start 源buffer读取时的起始位置
//end  源buffer读取时的结束位置
var srcBuf = new Buffer([4,5,6]);
var tarBuf = new Buffer(6);
tarBuf[0] = 1;
tarBuf[1] = 2;
tarBuf[2] = 3;
srcBuf.copy(tarBuf,3,0,3);
console.log(tarBuf);//123456


console.log(srcBuf instanceof Buffer);
console.log(Buffer.isBuffer(srcBuf));

console.log(Buffer.byteLength('珠峰培训','ascii'));

console.log(Buffer.isEncoding('utf8'));
console.log(Buffer.isEncoding('GBK'));
