/**
 * 书写一些判断代码，如果为假，抛出异常
 */
var assert = require('assert');
//判断值相等 ==
assert.equal(1,'1');
//判断值不相等 !=
assert.notEqual(1,'2');
//严格匹配  ===
//assert.strictEqual(1,'1');
//严格不相等 !===
//assert.strictNotEqual(1,'1');

//assert.ok(false,'对的');

/**
 * 深度比较
 * 1.如果是简单类型，内部使用 == 判断
 * 2.如果是数组、对象、缓存区，判断属性的长度和值
 **/
var a = [1,2];
var b = new Array();
console.log(Object.prototype.toString.call(a));
console.log(Object.prototype.toString.call(b));
b.push(1);b.push(2);
console.log(a==b);
console.log(a===b);
assert.deepEqual(a,b);


var c = {name:'zfpx',age:6};
var d = {age:6,name:'zfpx'};
var e =new Object();
e.age = 6;
e.name = 'zfpx';
assert.deepEqual(c,d);
assert.deepEqual(d,e);


assert.throws(
    function() {
        throw new Error("Wrong value");
    },
    function(err) {
        if ( (err instanceof Error) && /value/.test(err) ) {
            return true;
        }
    },
    "unexpected error"
);

assert.doesNotThrow(function(){
    //throw Error('wrong');
});