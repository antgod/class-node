/**
 * Buffer 缓存区 暂时存放在内存里的一段数据
 *
 */
//创建buffer有三种方式 new Buffer(size)

var sum = 0;
for(var i=0;i<8;i++){
    sum += Math.pow(2,i);
}
console.log(sum);// 0 -255

var buff1 = new Buffer(7);
buff1.fill(0);
console.log(buff1);

//2.数据创建
var buff2 = new Buffer([1,2,3]);
/*buff2[0]=1;
buff2[1]=2;
buff2[2]=3;*/
console.log(buff2);


//通过字符串创建
var buf3 = new Buffer('珠峰培训');
//console.log(buf3);
//value start end
//buf3.fill(0,3,6);
//console.log(buf3);

console.log(buf3.length);

var newBuf = buf3.slice(0,6);
console.log(newBuf);

newBuf.write('妙',0,3);
newBuf.write('味',3,6);
console.log(newBuf.toString());
console.log(buf3.toString());



