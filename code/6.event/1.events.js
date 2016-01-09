/**
 * Created by lihongji on 2015/6/28.
 */

function Emitter(){

}

//增加监听器
Emitter.prototype.on=function on(type,listener){
    if(typeof listener !='function'){
        throw TypeError('listener must by a function');
    }
    this._events=this._events||{};

    if(this._events[type]){
        this._events[type].push(listener);
    }else{
        this._events[type]=[listener];
    }
};


Emitter.prototype.emit=function emit(type){
    this._events=this._events||{};
    var listeners= this._events[type];
    if(listeners)  {
        listeners.forEach(function(listener){
            listener.apply(this);
        })
    }
};

function Girl(){}
//继承
Girl.prototype=new Emitter();

var girl=new Girl();

girl.on("18",function(){
    console.log('marry my son');
});

girl.emit("19");