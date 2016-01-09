/**
 * Created by lihongji on 2015/7/5.
 */

var map={
    "xx":"js",
    "3":"15",
    "yy":"16",
    "qwewe":"aaaaa"
}

var arr=[];

var keys=Object.keys(map).sort(function(a,b){
    return a-b;
});

console.log(keys);
keys.forEach(function(item,i){
   arr.push(map[item]);
});

console.log(arr);


