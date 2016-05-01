// 一旦当前事件循环结束，调用回到函数。
// 在对象构造后，在 I/O 事件发生前，你又想改变附加事件处理函数时，这个非常有用。
function MyThing() {
    process.nextTick(function() {
        this.startDoingStuff();
    }.bind(this));
}

MyThing.prototype={
    startDoingStuff(){
        console.log('next tick');
    },
    getReadyForStuff(){
        console.log('current tick');
    }
}

var thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() gets called now, not before.