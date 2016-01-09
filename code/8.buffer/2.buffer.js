var buff1 = new Buffer([1,2,3]);
var buff2 = new Buffer([4,5,6]);
console.log(Buffer.concat([buff1,buff2]));


console.log(Buffer.isBuffer(buff1));
console.log(Buffer.isEncoding('gbk'));

