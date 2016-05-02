
var util=require('util');
var EventEmitter=require('events');

function Fn(){

}

util.inherits(Fn,EventEmitter);

var fn=new Fn();

fn.on('event',function(args){
   console.log(args);
});


fn.emit('event','a');