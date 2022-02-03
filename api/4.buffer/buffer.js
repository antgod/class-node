/**
 * Created by lihongji on 16/3/5.
 */

var buffer1 = new Buffer('珠峰培训');

var buffer2 = new Buffer([1213123]);

console.log(buffer1.toString('utf8', 3, 6));
console.log(buffer2);
