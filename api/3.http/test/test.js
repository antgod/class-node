
var kelihua=function(){
    var fn=[].shift.call(arguments);
    var args=[].slice.call(arguments);
    return function(){
        var argument=  [].slice.call(arguments);
        return fn.apply(this,args.concat(argument));
    }
};


var cb=kelihua(function(){
   console.log(arguments);
},1,2,3);

cb(4,5,6);