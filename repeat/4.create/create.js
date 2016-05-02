

function Fn(){

    if(!(this instanceof Fn)) return new Fn();

    this.a=1;
}

var fn=Fn();

console.log(fn.a);