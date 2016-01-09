/**
 * Created by lihongji on 2015/7/5.
 */
var speakLession=function(cursor){
    return function(teacher){
        console.log('%s讲：%s',teacher,cursor)
    }
}

var speakNode=speakLession("node");
var speakMeteor=speakLession("meteor");

speakNode("张老师");
speakMeteor("杨老师");