/**
 * Created by lihongji on 2015/7/5.
 */


function Person(name,age){
    this.name=name;
    this.age=age;
}

var prototype=Person.prototype;
prototype.say=function(content){
    console.log("%s say: %s",this.name,content);
}

function Teacher(){
   Person.apply(this,arguments);
}

//Teacher.prototype=new Person();
Teacher.prototype=Object.create(Person.prototype);      //ES5
Teacher.prototype.constructor=Teacher;
Teacher.prototype.speakLession=function(lession){
    console.log(lession)
}


var xm=new Person("xm",22);
xm.say("我长大了");

var zry=new Teacher('张老师',18);
zry.say("我18了");
zry.speakLession("node");